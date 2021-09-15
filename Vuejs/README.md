# npm_xpressPay

This is a JavaScript library for implementing XpressPay payment gateway

## Demo

![Demo](npm_xpressPay.PNG?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to add XpressPay Payment to your Vue application



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


###  Using Vue
Home.vue sample
```vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Your Vue.js App XpressPay Demo</h1>
    <p> {{ paymentDescription }}</p>
    <button
      @click="payWithXpressPay"
      style="height:30px;width:120px;border-radius:5px;background:#3cbe3c;border:none;
            color:white;fontWeight:bold;cursor:pointer;"
    >
      Pay 1000
    </button>
  </div>
</template>

<script>
import XPay from 'npm_xpresspay'

export default {
  name: 'Home',
  data () {
    return {
      paymentDescription: ''
    }
  },
  methods: {
    payWithXpressPay () {
      const transactionId = 'Test' + Math.floor(Math.random() * 1000000)
      XPay.InitialisePayment({
        amount: '1000',
        transactionId: transactionId,
        email: 'sample@test.com',
        publicKey: 'xxxxxxxxxxxxxxxx',
        currency: 'NGN',
        mode: 'Debug',
        callbackUrl: window.location.href,
        metadata: [
          {
            name: 'sample',
            value: 'test'
          }
        ]
      }).then(response => {
        if (response.success) {
          sessionStorage.setItem('tranId', transactionId) // it can be saved to Database.
          sessionStorage.setItem('reference', response.data?.reference) // it can be saved to Database
          window.location.href = response.data?.authorizeUrl
        } else {
          window.location.href = response.data?.authorizeUrl
        }
      })
    }
  },
  mounted () {
    const tranId =
      localStorage.getItem('tranId') === null
        ? ''
        : localStorage.getItem('tranId')
    XPay.VerifyPayment({
      publicKey: 'xxxxxxxxxxxxxx',
      transactionId: tranId,
      mode: 'Debug'
    }).then(response => {
      const amount = response?.data?.amount
      if (amount) {
        const transactionHistory = response.data.history
        this.paymentDescription = 'You have paid ' + amount
        console.log(transactionHistory)
      } else {
        this.paymentDescription = ''
      }
    })
  }
}
</script>
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

