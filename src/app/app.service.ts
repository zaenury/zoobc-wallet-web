import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import * as CryptoJS from 'crypto-js'
import { GetPublicKeyFromSeed, GetAddressFromPublicKey } from '../helpers/utils'
import { byteArrayToBase64, toBase64Url, base64ToByteArray } from '../helpers/converters'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class AppService implements CanActivate {
  private sourceCurrSeed = new BehaviorSubject("");
  private sourceCurrPublicKey = new BehaviorSubject("");
  private sourceCurrAddress = new BehaviorSubject("");
  private sourceIsLoginPin = new BehaviorSubject(false);

  currSeed: Uint8Array
  currPublicKey: Uint8Array
  currAddress: string
  isLoginPin: boolean
  
  constructor(private router: Router, private http: HttpClient) {
    this.sourceCurrSeed.subscribe(value => {
      this.currSeed = base64ToByteArray(value)
    })

    this.sourceCurrPublicKey.subscribe(value => {
      this.currPublicKey = base64ToByteArray(value)
    })

    this.sourceCurrAddress.subscribe(value => {
      this.currAddress = value
    })

    this.sourceIsLoginPin.subscribe(value => {
      this.isLoginPin = value
    })
  }

  changeCurrentAccount(seed) {
    let pin = localStorage.getItem('pin')
    let seedBase64Url = toBase64Url(byteArrayToBase64(seed))
    let encSeed = CryptoJS.AES.encrypt(seedBase64Url, pin).toString()

    let publicKey = GetPublicKeyFromSeed(seed)
    let publicKeyBase64 = byteArrayToBase64(publicKey)
    let address = GetAddressFromPublicKey(publicKey)

    this.sourceCurrSeed.next(encSeed);
    this.sourceCurrPublicKey.next(publicKeyBase64);
    this.sourceCurrAddress.next(address);
  }

  getAllAccount() {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  }

  updateAllAccount(seed) {
    let accounts = this.getAllAccount();
    let pin = localStorage.getItem('pin')
    let seedBase64Url = toBase64Url(byteArrayToBase64(seed))
    let encSeed = CryptoJS.AES.encrypt(seedBase64Url, pin).toString()
    let isDuplicate = accounts.find(acc => acc.encSeed == encSeed);

    if (!isDuplicate) {
      accounts.push(encSeed);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }

  onLoginPin() {
    this.sourceIsLoginPin.next(true)
  }

  canActivate(): boolean {
    if (this.currPublicKey.length > 0) return true;
    
    this.router.navigateByUrl("/login");
    return false;
  }

  getCurrencyRate() {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=USD')
  }
}
// Language
export const LANGUAGES = [
    {
        country: 'English',
        code: 'en'
    },
    {
        country: 'Indonesia',
        code: 'id'
    },
] 
