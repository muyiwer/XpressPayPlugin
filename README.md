# npm_xpressPay

This is a JavaScript library for implementing XpressPay payment gateway

## Demo

![Demo](npm_xpressPay.PNG?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to add XpressPay Payment to your React, Vue, Angular and any other Javascript Framework application



### Install

```sh
npm install i npm_xpresspay
```

or with `yarn`

```sh
yarn add npm_xpresspay
```

### Usage

This library can be implemented into any Javascript framework applications


 ### Sample Function Request and Responses

Request for calling InitialisePayment function
```json
{
   "amount":  "2000.00", //Required
      "transactionId": "Math.floor(Math.random() * 1000000)", //Required
      "email": "sample@mail.com",//Required
      "publicKey": "xxxxxxxxxxxxxxxxxxxxxxxxxx",//Required
      "currency": "NGN",//Required
      "mode": "Debug",//Default is Debug
      "callbackUrl": "window.location.href",//Optional
      "metadata": [//Optional
        {
          "name": "sample",
          "value": "test",
        },
      ],
}
```


Response from calling InitialisePayment function

```json
{
  "success":true,
  "message":"sucessfully initialized payment",
  "data": {
                "authorizeUrl": "http://xpay.com/xxxxxxxx",
                "reference": "xxxxxxxx",
          }
}


Request for calling VerifyPayment function
```json
{
    "publicKey": "xxxxxxxxxxxxxx",
    "transactionId":"1234567890",
    "mode": "Debug",
}

```
Response from calling VerifyPayment function

```json
{
  "success":true,
  "message":"sucessfully initialized payment",
   "data": {
    "$id": "2",
    "amount": "10.00",
    "paymentType": null,
    "currency": "NGN",
    "status": "Payment Initiation",
    "gatewayResponse": null,
    "transactionId": "1234567",
    "histories": {
      "$id": "3",
      "$values": [
        {
          "$id": "4",
          "type": "Action",
          "message": "Attempt to pay with card",
          "date": "15 Sep 2021",
          "time": "08:14 AM"
        },
        {
          "$id": "5",
          "type": "Action",
          "message": "Entered otp",
          "date": "15 Sep 2021",
          "time": "08:17 AM"
        }
      ]
    }
  }
}
```

### 1. Using React
Please checkout [React Documentation](https://github.com) for how you can implement it on react

### 1. Using Angular
Please checkout [Angular Documentation](https://github.com) for how you can implement it on angular

### 1. Using Vue
Please checkout [Vue Documentation](https://github.com) for how you can implement it on vue

### 1. Using CDN
Please checkout [CDN Documentation](https://github.com) for how you can implement it via CDN



## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
