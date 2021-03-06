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
      publicKey: "XPPUBK-19995e83ba654840be35242359b66f8c-X",
      currency: "NGN",
      mode: "Debug",
      productId: "1001",
      productDescription: "test",
      callbackUrl: `${window.location.href}?transactionid=${transactionId}`,
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
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transactionid');
  XPay.VerifyPayment({
    publicKey: "XPPUBK-19995e83ba654840be35242359b66f8c-X",
    transactionId: transactionId,
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
