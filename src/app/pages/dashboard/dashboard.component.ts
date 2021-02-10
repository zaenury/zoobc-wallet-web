import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService, SavedAccount } from 'src/app/services/auth.service';
import { AddAccountComponent } from '../account/add-account/add-account.component';
import { EditAccountComponent } from '../account/edit-account/edit-account.component';
import { Subscription, timer } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { ReceiveComponent } from '../receive/receive.component';
import { getTranslation } from 'src/helpers/utils';
import { TranslateService } from '@ngx-translate/core';
import { RestoreAccountService } from 'src/app/services/restore-account.service';
import { MultisigService } from 'src/app/services/multisig.service';
import zoobc, {
  TransactionListParams,
  MempoolListParams,
  ZBCTransaction,
  AccountBalance,
  TransactionType,
} from 'zbc-sdk';

interface AmountFormatted {
  currency: String;
  amount1: String;
  amount2: String;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subscription: Subscription = new Subscription();

  spendableBalanceFormatted: AmountFormatted;
  lockedFormatted: AmountFormatted;
  accountBalance: AccountBalance;
  isLoading: boolean = false;
  isError: boolean = false;

  totalTx: number;
  recentTx: ZBCTransaction[];
  unconfirmTx: ZBCTransaction[];

  reloadingTimer: Subscription;
  currAcc: SavedAccount;
  accounts: SavedAccount[];
  lastRefresh: number;
  lastRefreshAccount: number;

  showAccountsList: boolean = true;

  constructor(
    private authServ: AuthService,
    private restoreServ: RestoreAccountService,
    private dialog: MatDialog,
    private router: Router,
    private contactServ: ContactService,
    private translate: TranslateService,
    private multisigServ: MultisigService
  ) {
    this.currAcc = this.authServ.getCurrAccount();

    this.loadBalanceAndTxs();
    // const subsRate = this.currencyServ.rate.subscribe(rate => (this.currencyRate = rate));
    // this.subscription.add(subsRate);
    // this.currencyServ
    //   .getRates()
    //   .then(rates => (this.currencyRates = rates))
    //   .catch(err => console.log(err));

    this.showAccountsList =
      this.currAcc.type == 'one time login' || this.currAcc.type == 'address' ? false : true;
  }

  ngOnInit() {
    this.restoreServ.restoreAccounts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.reloadingTimer.unsubscribe();
  }

  loadBalanceAndTxs() {
    if (this.reloadingTimer) this.reloadingTimer.unsubscribe();

    this.isLoading = true;
    this.isError = false;
    this.reloadingTimer = timer(0, 60 * 1000).subscribe(async next => {
      if (next == 0) {
        this.isLoading = true;
        this.recentTx = null;
        this.unconfirmTx = null;
      }

      try {
        await this.getBalance();
        await this.getTransactions();
        this.isError = false;
      } catch {
        if (next == 0) this.isError = true;
      }
      this.isLoading = false;
    });
  }

  spendableBalanceFormatting(val) {
    const balance = parseFloat(val) / 1e8;
    const balances = balance.toString().split('.');

    return {
      currency: 'ZBC ',
      amount1: balances[0],
      amount2: balances[1] ? `.${balances[1]}` : '',
    };
  }

  lockedFormatting(balance, spendable) {
    const diff = parseFloat(balance) - parseFloat(spendable);
    const diffs = diff.toString().split('.');

    return {
      currency: 'ZBC ',
      amount1: diffs[0] ? diffs[0] : null,
      amount2: diffs[1] ? `.${diffs[1]}` : null,
    };
  }

  getBalance() {
    zoobc.Account.getBalance(this.currAcc.address)
      .then((data: AccountBalance) => {
        this.accountBalance = data;
        this.spendableBalanceFormatted = this.spendableBalanceFormatting(data.spendableBalance);
        this.lockedFormatted = this.lockedFormatting(data.balance, data.spendableBalance);
        return this.authServ.getAccountsWithBalance();
      })
      .then((res: SavedAccount[]) => (this.accounts = res))
      .catch(e => {
        console.log(e);
        throw e;
      })
      .finally(() => (this.lastRefreshAccount = Date.now()));
  }

  async getTransactions() {
    const params: TransactionListParams = {
      address: this.currAcc.address,
      pagination: {
        page: 1,
        limit: 10,
      },
    };

    try {
      const trxList = await zoobc.Transactions.getList(params);
      trxList.transactions.map(transaction => {
        transaction.senderAlias = this.contactServ.get(transaction.sender.value).name || '';
        transaction.recipientAlias = this.contactServ.get(transaction.recipient.value).name || '';
        return transaction;
      });
      this.recentTx = trxList.transactions;
      this.totalTx = trxList.total;

      const paramPool: MempoolListParams = { address: this.currAcc.address };
      const unconfirmTx = await zoobc.Mempool.getList(paramPool);
      unconfirmTx.transactions.map(transaction => {
        transaction.senderAlias = this.contactServ.get(transaction.sender.value).name || '';
        transaction.recipientAlias = this.contactServ.get(transaction.recipient.value).name || '';
        return transaction;
      });
      this.unconfirmTx = unconfirmTx.transactions;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      this.lastRefresh = Date.now();
    }
  }

  goToMultisig() {
    if (this.currAcc.type == 'multisig')
      this.multisigServ.initDraft(this.currAcc, TransactionType.SENDMONEYTRANSACTION);
  }

  openReceiveForm() {
    this.dialog.open(ReceiveComponent, { width: '480px' });
  }

  onSwitchAccount(account: SavedAccount) {
    this.authServ.switchAccount(account);
    this.router.navigateByUrl('/');
  }

  onOpenAddAccount() {
    const dialog = this.dialog.open(AddAccountComponent, { width: '360px', maxHeight: '99vh' });

    dialog.afterClosed().subscribe((added: boolean) => {
      if (added) {
        this.authServ.getAccountsWithBalance().then(accounts => (this.accounts = accounts));
        this.currAcc = this.authServ.getCurrAccount();
        this.getBalance();
        this.getTransactions();
      }
    });
  }

  onOpenEditAccount(e, account: SavedAccount) {
    e.stopPropagation();
    const dialog = this.dialog.open(EditAccountComponent, {
      width: '360px',
      maxHeight: '99vh',
      data: account,
    });
    dialog.afterClosed().subscribe((account: SavedAccount) => {
      if (account) {
        this.currAcc = account;
        this.authServ.getAccountsWithBalance().then(accounts => (this.accounts = accounts));
      }
    });
  }

  async onComingSoonPage() {
    const message = getTranslation('coming soon', this.translate);
    Swal.fire({
      type: 'info',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
