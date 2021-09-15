# npm_xpressPay

This is a JavaScript library for implementing XpressPay payment gateway

## Demo

![Demo](npm_xpressPay.png?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to add XpressPay Payment to your Angular application



### Install

```sh
npm install i npm_xpresspay
```

or with `yarn`

```sh
yarn add npm_xpresspay
```

### Usage

This library can be implemented into any Javascript framework application


###  Using Angular
app.component.ts
```javascript
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
      publicKey: "xxxxxxxxxxxxx",
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
    publicKey: "xxxxxxxxxxxxxxx",
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

```
app.component.html
```html
<div class="toolbar" role="banner">
  <img width="40" alt="Angular Logo"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==" />
  <span>Welcome</span>
  <div class="spacer"></div>
  <a aria-label="Angular on twitter" target="_blank" rel="noopener" href="https://twitter.com/angular" title="Twitter">

  </a>
</div>

<div class="content" role="main">

  <!-- Highlight Card -->
  <div class="card highlight-card card-small">

    <span>{{ title }} app is running!</span>


  </div>

  <div class="container" style="margin-top: 50px;">
    <button
    (click)="PayWithXpressPay()"
    style="
      height:30px; width:150px;border-radius: 5px; background:#3cbe3c;border: none;
      color:white; font-weight:bold;cursor:pointer;"
    type="button"
  > Pay 1000
  </button>
  </div>

</div>

<router-outlet></router-outlet>


```
Please checkout [Xpresspay Documentation](https://github.com) other ways you can integrate with our plugin
## Deployment

REMEMBER TO CHANGE THE MODE ON REQUEST OF THE FUNCTIONS WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM


## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
