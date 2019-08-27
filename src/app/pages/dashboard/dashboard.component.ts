import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { AccountService } from '../../services/account.service';
import {
  TransactionService,
  Transaction,
} from '../../services/transaction.service';
import {
  Currency,
  CurrencyRateService,
} from 'src/app/services/currency-rate.service';
import { AuthService, SavedAccount } from 'src/app/services/auth.service';
import { ReceiveComponent } from '../receive/receive.component';
import {
  GetAccountBalanceResponse,
  AccountBalance as AB,
} from 'src/app/grpc/model/accountBalance_pb';

type AccountBalance = AB.AsObject;
type AccountBalanceList = GetAccountBalanceResponse.AsObject;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountBalance: AccountBalance;
  showSpinnerBalance: boolean = true;
  showSpinnerRecentTx: boolean = true;

  recentTx: Transaction[];

  currencyRate: Currency = {
    name: '',
    value: 0,
  };
  currencyRates: Currency[];

  account: SavedAccount;
  address: string;

  zbcPriceInUsd: number = 10;

  constructor(
    private accountServ: AccountService,
    private authServ: AuthService,
    private transactionServ: TransactionService,
    private currencyServ: CurrencyRateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.account = this.authServ.getCurrAccount();
    this.address = this.authServ.currAddress;
  }

  ngOnInit() {
    window.scroll(0, 0);

    this.accountServ.getAccountBalance().then((data: AccountBalanceList) => {
      this.accountBalance = data.accountbalance;
      this.showSpinnerBalance = false;
      console.log(this.accountBalance);
    });

    this.transactionServ
      .getAccountTransaction(1, 5)
      .then((res: Transaction[]) => {
        this.recentTx = res;
        this.showSpinnerRecentTx = false;
      });

    this.currencyServ.currencyRate.subscribe((rate: Currency) => {
      this.currencyRate = rate;
    });

    this.getCurrencyRates();
    this.currencyRate = this.currencyServ.rate;
  }

  getCurrencyRates() {
    this.currencyServ.getCurrencyRate().subscribe((res: any) => {
      let rates = Object.keys(res.rates).map(currencyName => {
        let rate = {
          name: currencyName,
          value: res.rates[currencyName] * this.zbcPriceInUsd,
        };
        if (this.currencyRate.name == currencyName)
          this.currencyRate.value = rate.value;
        return rate;
      });
      rates.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      });

      this.currencyRates = rates;
    });
  }

  onChangeRate(rate) {
    this.currencyServ.onChangeRate(rate);
    this.currencyRate = rate;
  }

  copyText(text) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBar.open('Address Copied', null, { duration: 5000 });
  }

  openReceiveForm() {
    this.dialog.open(ReceiveComponent, {
      width: '480px',
    });
  }
}
