import { Component, OnInit } from "@angular/core";

import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  accountBalance;

  accountBalanceServ: any
  getAccountBalanceReq: any
  recentTx: any[]

  constructor(
    private accountServ: AccountService,
    private transactionServ: TransactionService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.accountServ.getAccountBalance().then(data => {
      this.accountBalance = data;
    });

    this.transactionServ.getAccountTransaction().then((res: any) => {
      this.recentTx = res.transactionsList;
      this.recentTx = this.recentTx.slice(0, 4)
    });
  }
}
