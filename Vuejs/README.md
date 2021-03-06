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
        callbackUrl: `${window.location.href}/transactionId=${transactionId}`,
        productId:"1001",
        productDescription:"MTN",
        metadata: [
          {
            name: 'sample',
            value: 'test'
          }
        ]
      }).then(response => {
        if (response.success) {
          sessionStorage.setItem("reference", response.data?.reference); // it should be saved to Database (optional)
          window.location.href = response.data?.authorizeUrl
        } else {
          window.location.href = response.data?.authorizeUrl
        }
      })
    }
  },
  mounted () {
   const transactionId = 12334567 //From the callback/current url/ or any other way you can better implement it;
    XPay.VerifyPayment({
      publicKey: 'xxxxxxxxxxxxxx',
      transactionId: transactionId,
      mode: 'Debug'
    }).then(response => {
      const amount = response?.data?.amount
       if (response.success) {
           //Transaction successful at payment gateway
        const transactionHistory = response.data.history
        this.paymentDescription = 'You have paid ' + amount
      } else {
          //Transaction NOT successful at payment gateway
        this.paymentDescription = ''
      }
    })
  }
}
</script>
```
## Test Cards
|Type of Card       | Card PAN              | Expiry Date  | Pin  | CVV2   
| :------------------------------------------------- | :------------------------- | :---------- | :---------- | :----------
| Successful Transactions Card | 6280511000000095  | 12/26 | 0000 | 123
| Successful Transactions Card | 5399830000000008  | 05/30 | 123456 | 000
| VISA Test Card | 4000000000000002  | 	03/50 | 	N/A | 123
| Insufficient Funds Card | 5061030000000000027  | 01/22 | 1234 | 123
| Exceeds Withdrawal Limit Card | 5061030000000000068  | 01/22 | 1234 | 123


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

