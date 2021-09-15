import { Component } from '@angular/core';
import XPay from 'npm_xpresspay'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoapp';
  paymentDescription = this.GetPaymentDescription();
  PayWithXpressPay() {
    const transactionId = "Test" + Math.floor(Math.random() * 1000000);
    XPay.InitialisePayment({
      amount: "1000",
      transactionId: transactionId,
      email: "sample@test.com",
      publicKey: "XPPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
      currency: "NGN",
      mode: "Debug",
      callbackUrl: window.location.href,
      metadata: [
        {
          name: "sample",
          value: "test",
        },
      ],
    }).then((response : any) => {
      if (response.success) {
        sessionStorage.setItem("tranId", transactionId); // it can be saved to Database.
        sessionStorage.setItem("reference", response.data?.reference); // it can be saved to Database
        window.location.href = response.data?.authorizeUrl;
      } else {
        window.location.href = response.data?.authorizeUrl;
      }
    });
  };
   GetPaymentDescription() : string {
    const tranId =
    localStorage.getItem("tranId") === null
      ? ""
      : localStorage.getItem("tranId");
  XPay.VerifyPayment({
    publicKey: "XPPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
    transactionId: tranId,
    mode: "Debug",
  }).then((response :any) => {
    let amount = response?.data?.amount;
    if (amount) {
      sessionStorage.setItem('transactionHistory', response.data.history)
      return "You have paid " + amount;
    } else {
      return ''
    }
  });
  return ''
  }
}
