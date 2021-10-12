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

#### Request for calling InitialisePayment function.

To initialize the transaction, you'll need to pass information such as email, first name, last name amount, publicKey, etc. Email and amount are required. You can also pass any other additional information in the metadata object field. Here is the full list of parameters you can pass:
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| amount	| `string`			   | undefined      | `true`  | Amount you want to debit customer e.g 1000.00, 10.00...
| transactionId      | `string`             | undefined   | `true`  | Unique case sensitive transaction identification
| email | `string`             | undefined       | `true`  | Email address of customer
| publicKey       | `string`        | undefined | `true`  | Your public key from XpressPay.
| currency      | `string`  |  `NGN`    | `true`   | Currency charge should be performed in. Allowed only `NGN`.
| mode      | `string`  |  `Debug`    | `true`   | Allowed values are `Debug` or `Live`.
| callBackUrl      | `string`  |  your current url page    | `false`   | CallbackUrl is the url you want your customer to be redirected to when payment is successful. The default url is the page url where customer intialized payment.
| metadata      | `object`  |  empty `object`    | `false`   | Object containing any extra information you want recorded with the transaction.

```json
{
      "amount":  "2000.00", 
      "transactionId": "Math.floor(Math.random() * 1000000)", 
      "email": "sample@mail.com",
      "publicKey": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
      "currency": "NGN",
      "mode": "Debug",
      "callbackUrl": "window.location.href/?transactionId=12345678",
      "metadata": [
        {
          "name": "sample",
          "value": "test",
        },
      ],
}
```
#### Response from calling InitialisePayment function

|Param       | Type                 | Description                      
| :------------ | :------------------- | :-------------------------------------------------
| success	| `boolean`			 | Shows whether the intialise payment function call was successful or not
| message | `string`  | description of the response data
| data | `object`          | it includes `authorizeUrl` which is the url that you will use to redirect your customers to make payment and `reference` which is the unique transaction identification generated from us.

```json
{
  "success":true,
  "message":"sucessfully initialized payment",
  "data": {
                "authorizeUrl": "http://xpay.com/xxxxxxxx",
                "reference": "xxxxxxxx",
          }
}
```



#### Request for calling VerifyPayment function.

To verify payment, you'll need to pass information such as publicKey, transactionId and mode are required. Here is the full list of parameters you can pass:
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| transactionId      | `string`             | undefined   | `true`  | Unique case sensitive transaction identification
| publicKey       | `string`        | undefined | `true`  | Your public key from XpressPay.
| mode      | `string`  |  `Debug`    | `true`   | Allowed values are `Debug` or `Live`.

```json
{
    "publicKey": "xxxxxxxxxxxxxx",
    "transactionId":"1234567890",
    "mode": "Debug",
}

```
#### Response from calling VerifyPayment function
|Param       | Type                 | Description                      
| :------------ | :------------------- | :-------------------------------------------------
| success	| `boolean`			 | Shows whether the intialise payment function call was successful or not
| message | `string`  | description of the response data

#### data object
|Param       | Type                 | Description    
| :------------ | :------------------- | :-------------------------------------------------
| amount | `string`  | amount debited from customer
| currency | `string`  | amount currency
| status | `string`  | status from the transaction made by cusstomer
| paymentType | `string`  | type of payment made by customer eg Card, Bank, USSD, QR....
| gatewayResponse | `string`  | response from payment gateway
| transactionId | `string`  | unique transaction identification generated by you for the customer transaction.

#### histories objects ($values)
|Param       | Type                 | Description    
| :------------ | :------------------- | :-------------------------------------------------
| type | `string`  | Identicates the title of the summary of what happened during customer transaction on our payment page at a particular period of time. eg `action` which means customer inputed details or clicks a button `success` which means transaction was successful `error` which means error occured at the end of the transaction `redirect` which means user was redirected
| message | `string`  | Description of what customer did or happened during the particular period of making transaction on our payment page
| status | `string`  | The status from the transaction made by customer
| date | `string`  | The date customer or system executed this process
| time | `string`  | The time the customer or system executed this process

```json
{
  "success":true,
  "message":"sucessfully initialized payment",
   "data": {
    "$id": "2",
    "amount": "10.00",
    "currency": "NGN",
    "status": "Transaction Successful",
    "paymentType":"Card",
    "gatewayResponse": "Transaction Successful. Approved",
    "transactionId": "1234567",
    "histories": {
      "$id": "3",
      "$values": [
        {
          "$id": "4",
          "type": "action",
          "message": "Filled these fields: card number, card expiry, card cvv and card pin",
          "date": "15 Sep 2021",
          "time": "08:14 AM"
        },
        {
          "$id": "5",
          "type": "action",
          "message": "Attempt to pay",
          "date": "15 Sep 2021",
          "time": "08:17 AM"
        },
         {
          "$id": "6",
          "type": "success",
          "message": "Successful transaction",
          "date": "15 Sep 2021",
          "time": "08:18 AM"
        },
        {
          "$id": "7",
          "type": "redirect",
          "message": "Redirected user back to your app",
          "date": "15 Sep 2021",
          "time": "08:19 AM"
        }
      ]
    }
  }
}
```
## Test Cards
|Type of Card       | Card PAN              | Expiry Date  | Pin  | CVV2   
| :------------------------------------------------- | :------------------------- | :---------- | :---------- | :----------
| Successful Transactions Card | 6280511000000095  | 12/26 | 0000 | 123
| Successful Transactions Card | 5399830000000008  | 05/30 | 123456 | 000
| VISA Test Card | 4000000000000002  | 	03/50 | 	N/A | 123
| Insufficient Funds Card | 5061030000000000027  | 01/22 | 1234 | 123
| Exceeds Withdrawal Limit Card | 5061030000000000068  | 01/22 | 1234 | 123


### 1. Using React
Please checkout [React Documentation](https://github.com/muyiwer/XpressPayPlugin/tree/main/React) for how you can implement it on react

### 2. Using Angular
Please checkout [Angular Documentation](https://github.com/muyiwer/XpressPayPlugin/tree/main/Angular) for how you can implement it on angular

### 3. Using Vue
Please checkout [Vue Documentation](https://github.com/muyiwer/XpressPayPlugin/tree/main/Vuejs) for how you can implement it on vue

### 4. Using CDN
Please checkout [Via CDN Documentation](https://github.com/muyiwer/XpressPayPlugin/tree/main/CDN) for how you can implement it via CDN



## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
