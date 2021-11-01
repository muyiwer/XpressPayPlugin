## Get Started

This APIs documentation provides a way to integrate our API to any application.

### Usage

This API can be integrated into any application


### Initialize Payment
This api initialize customer payment by inputing all custumer payment details and api response with payment reference and authorized url where customer will be redirected to make payment.
To initialize the transaction, you'll need to pass information such as email, first name, last name amount, publicKey, etc. Email and amount are required. You can also pass any other additional information in the metadata object field.
##### {{baseUrl}}/api/Payments/Initialize
##### Request body
```json
{
  "transactionId": "123456789",
  "currency": "NGN",
  "callbackUrl": "http://www.merchant-callback-url.com",
  "metadata": [
    {
      "name": "smaple",
      "value": "test"
    }
  ],
  "productId": "001",
  "productDescription": "MTN"
}
```
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| amount	| `string`			   | null      | `true`  | Amount you want to debit customer e.g 1000.00, 10.00...
| transactionId      | `string`             | null   | `true`  | Unique case sensitive transaction identification
| email | `string`             | null       | `true`  | Email address of customer
| currency      | `string`  |  `NGN`    | `true`   | Currency charge should be performed in. Allowed only `NGN`.
| productId      | `string`  |  null    | `false`   | unique identification number of the product your customer want to pay to.
| productDescription     | `string`  |  null    | `false`   | description number of the product your customer want to pay to.
| mode      | `string`  |  `Debug`    | `true`   | Allowed values are `Debug` or `Live`.
| callBackUrl      | `string`  |  your current url page    | `false`   | CallbackUrl is the url you want your customer to be redirected to when payment is successful. The default url is the page url where customer intialized payment.
| metadata      | `object`  |  empty `object`    | `false`   | Object containing any extra information you want recorded with the transaction.

##### Request header
|Name       | Value                | Required | Description   
| :------------ | :------------------- | :------- | :-------------------------------------------------
|Content-type      | `application/json`        | `true`  | The request body format.
| Authorization       | `bearer {publicKey}`        | `true`  |  Your public key from XpressPay. There should be a space in between bearer and the public key

##### Response body
```json
{
  "responseCode":"00",
  "responseMessage":"sucessfully initialized payment",
  "data": {
                "authorizeUrl": "http://xpay.com/xxxxxxxx",
                "reference": "xxxxxxxx",
          }
}
```
|Param       | Type                 | Description                      
| :------------ | :------------------- | :-------------------------------------------------
| responseCode	| `string`			 | `00` response code represent success else failed
| responseMessage | `string`  | description of the response data
| data | `object`          | it includes `authorizeUrl` which is the url that you will use to redirect your customers to make payment and `reference` which is the unique transaction identification generated from us.




### Verify Payment
To verify payment, you'll need to pass information such as publicKey, transactionId and mode are required. Here is the full list of parameters you can pass:
##### {{baseUrl}}/api/Payments/VerifyPayment
##### Request body
```json
{
    "transactionId":"1234567890",
}

```
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| transactionId      | `string`             | null   | `true`  | Unique case sensitive transaction identification
##### Request header
|Name       | Value                | Required | Description   
| :------------ | :------------------- | :------- | :-------------------------------------------------
|Content-type      | `application/json`        | `true`  | The request body format.
| Authorization       | `bearer {publicKey}`        | `true`  | Your public key from XpressPay. There should be a space in between bearer and the public key

##### Response body
```json
{
  "responseCode":"00",
  "responseMessage":"sucessfully initialized payment",
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
|Param       | Type                 | Description                      
| :------------ | :------------------- | :-------------------------------------------------
| responseCode	| `string`			 | `00` response code represent success else failed
| responseMessage | `string`  | description of the response data


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




