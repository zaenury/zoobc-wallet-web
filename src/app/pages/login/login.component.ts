import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthService } from 'src/app/services/auth.service';
import { PinsComponent } from 'src/app/components/pins/pins.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pin') pin: PinsComponent;

  encPassphrase = localStorage.getItem('ENC_PASSPHRASE_SEED');
  isLoggedIn: boolean;
  isLoading: boolean = false;
  hasAccount = this.encPassphrase ? true : false;

  formLoginPin: FormGroup;
  pinForm = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]*$'),
  ]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appServ: AppService,
    private authServ: AuthService,
    @Inject(DOCUMENT) private document
  ) {
    this.formLoginPin = new FormGroup({
      pin: this.pinForm,
    });
  }

  ngOnInit() {
    let isLoggedIn: boolean = this.appServ.isLoggedIn();
    if (isLoggedIn) this.router.navigateByUrl('/dashboard');
  }

  ngAfterViewInit() {
    this.toogleBackground();
  }

  ngOnDestroy() {
    this.toogleBackground(false);
  }

  onChangePin() {
    if (this.pinForm.value.length == 6) this.onLogin();
  }

  onLogin() {
    if (this.formLoginPin.valid) {
      this.isLoading = true;

      setTimeout(() => {
        if (this.authServ.login(this.pinForm.value)) {
          this.route.queryParams.subscribe(params => {
            const redirect = params.redirect || '/dashboard';
            this.router.navigateByUrl(redirect);
          });
        } else {
          this.pinForm.setErrors({ invalid: true });
          this.pin.onReset();
        }
        this.isLoading = false;
      }, 50);
    }
  }

  toogleBackground(show: boolean = true) {
    if (show) this.document.getElementById('navbar-head').classList.add('no-color');
    else this.document.getElementById('navbar-head').classList.remove('no-color');
    let boxImage = this.document.getElementsByClassName('background-box');
    for (let i = 0; i < boxImage.length; i++) {
      if (show) boxImage[i].classList.remove('hide');
      else boxImage[i].classList.add('hide');
    }
  }
}
