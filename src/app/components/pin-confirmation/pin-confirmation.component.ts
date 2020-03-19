import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import zoobc from 'zoobc-sdk';

@Component({
  selector: 'app-pin-confirmation',
  templateUrl: './pin-confirmation.component.html',
  styleUrls: ['./pin-confirmation.component.scss'],
})
export class PinConfirmationComponent implements OnInit {
  formConfirmPin: FormGroup;
  pinField = new FormControl('', Validators.required);

  isFormSendLoading = false;
  isConfirmPinLoading = false;

  constructor(public dialogRef: MatDialogRef<PinConfirmationComponent>) {
    this.formConfirmPin = new FormGroup({
      pin: this.pinField,
    });
  }

  ngOnInit() {}

  onTypePin() {
    if (this.pinField.value.length == 6) {
      this.isConfirmPinLoading = true;

      // give some delay so that the dom have time to render the spinner
      setTimeout(() => {
        const encPassphrase = localStorage.getItem('ENC_PASSPHRASE_SEED');
        const isPinValid = zoobc.Wallet.decryptPassphrase(
          encPassphrase,
          this.pinField.value
        );
        if (!isPinValid) this.dialogRef.close(true);
        else this.formConfirmPin.setErrors({ invalid: true });
        this.isConfirmPinLoading = false;
      }, 50);
    }
  }
}