import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SendmoneyComponent } from "./pages/sendmoney/sendmoney.component";
import { SendmessageComponent } from "./pages/sendmessage/sendmessage.component";
import { LoginComponent } from "./login/login.component";
import { TransferhistoryComponent } from "./pages/transferhistory/transferhistory.component";
import { SignupComponent } from './pages/signup/signup.component'

import { ParentComponent } from "../app/components/parent/parent.component";

const routes: Routes = [
  {
    path: "",
    component: ParentComponent,
    children: [
      { path: "sendmessage", component: SendmessageComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "transferhistory", component: TransferhistoryComponent },
      { path: "sendmoney", component: SendmoneyComponent }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}