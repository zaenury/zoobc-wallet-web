import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService, SavedAccount } from 'src/app/services/auth.service';
import zoobc, { TransactionType, TransactionListParams, multisigPendingDetail } from 'zbc-sdk';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-multisig-approval-history',
  templateUrl: './multisig-approval-history.component.html',
  styleUrls: ['./multisig-approval-history.component.scss'],
})
export class MultisigApprovalHistoryComponent implements OnInit {
  page: number = 1;
  perPage: number = 10;
  total: number = 0;
  address: string;
  isLoading: boolean = false;
  isError: boolean = false;
  finished: boolean = false;
  multisigHistory: any[] = [];
  isLoadingDetail: boolean = false;
  transactionDetail: any;
  transactionId: string;
  lastRefresh: number;
  account: SavedAccount;
  participants: string[] = [];

  detailTransactionRefDialog: MatDialogRef<any>;
  @ViewChild('detailTransaction') detailTransactionDialog: TemplateRef<any>;

  constructor(private authServ: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    const multisigAccount = JSON.parse(localStorage.getItem('CURR_MULTISIG'));
    this.participants = multisigAccount.participants;
  }

  ngOnDestroy() {
    this.authServ.switchMultisigAccount();
  }

  async getMultiSigTransaction(reload: boolean = false) {
    if (this.isLoading) return;
    if (this.account == undefined) return;
    const perPage = Math.ceil(window.outerHeight / 50);

    if (reload) {
      this.multisigHistory = null;
      this.page = 1;
    }

    this.isLoading = true;
    this.isError = false;

    const txParam: TransactionListParams = {
      address: this.account.address,
      transactionType: TransactionType.MULTISIGNATURETRANSACTION,
      pagination: {
        page: this.page,
        limit: perPage,
      },
    };
    try {
      let tx = await zoobc.Transactions.getList(txParam);
      const multisig = tx.transactions.filter(mh => mh.txBody.signatureinfo);
      this.total = tx.total;
      if (reload) {
        this.multisigHistory = multisig;
      } else {
        this.multisigHistory = this.multisigHistory.concat(multisig);
      }
    } catch (err) {
      this.isError = true;
      console.log(err);
    } finally {
      this.isLoading = false;
      this.lastRefresh = Date.now();
    }
  }

  onScroll() {
    if (this.multisigHistory && this.multisigHistory.length < this.total) {
      this.page++;
      this.getMultiSigTransaction();
    } else this.finished = true;
  }

  onOpenDetailTransaction(txHash: string, id: string) {
    this.transactionId = id;
    this.isLoadingDetail = true;
    zoobc.MultiSignature.getPendingByTxHash(txHash).then((res: multisigPendingDetail) => {
      this.transactionDetail = res.pendingtransaction;
      this.isLoadingDetail = false;
    });
    this.detailTransactionRefDialog = this.dialog.open(this.detailTransactionDialog, {
      width: '500px',
      maxHeight: '90vh',
    });
  }

  redirect() {
    window.open('https://zoobc.net/transactions/' + this.transactionId, '_blank');
  }
  onSwitchAccount(account: SavedAccount) {
    this.account = account;
    this.authServ.switchAccount(account);
    this.getMultiSigTransaction(true);
  }
}
