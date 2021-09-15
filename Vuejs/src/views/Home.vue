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
// @ is an alias to /src
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
