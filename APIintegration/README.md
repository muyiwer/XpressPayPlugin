## Get Started

This APIs documentation provides a way to integrate our API to any application.

### Usage

This API can be integrated into any application

### Base Urls
#### Test
https://pgsandbox.xpresspayments.com:8090/
#### Production
https://myxpresspay.com:6004/


### Initialize Payment
This api initialize customer payment by inputing all custumer payment details and api response with payment reference and authorized url where customer will be redirected to make payment.
To initialize the transaction, you'll need to pass information such as email, first name, last name amount, publicKey, etc. Email and amount are required. You can also pass any other additional information in the metadata object field.
##### {{baseUrl}}/api/Payments/Initialize
##### Request body
```json
{
      "amount":  "2000.00", 
      "transactionId": "321654", 
      "email": "sample@mail.com",
      "publicKey": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
      "currency": "NGN",
      "mode": "Debug",
      "callbackUrl": "www.test.com/?transactionId=12345678",
      "productId":"1001",
      "applyConviniencyCharge":true,
      "productDescription":"MTN",
      "isSplitpayment": true,
      "splitPaymentReference": "string",
      "bodyColor": "#0000",
      "buttonColor": "#0000",
      "footerText": "Powered by Test Ltd",
      "footerLink": "http://test.com",
      "footerLogo": "http://test.com/test.png",
      "metadata": [
        {
          "name": "sample",
          "value": "test",
        },
      ],
}
```
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| amount	| `string`			   | null      | `true`  | Amount you want to debit customer e.g 1000.00, 10.00...
| transactionId      | `string`             | null   | `true`  | Unique case sensitive transaction identification. The transactionId should not be minimum of 6 and maximum of 30
| email | `string`             | null       | `true`  | Email address of customer
| currency      | `string`  |  `NGN`    | `true`   | Currency charge should be performed in. Allowed only `NGN`.
| productId      | `string`  |  null    | `false`   | unique identification number of the product your customer want to pay to.
| productDescription     | `string`  |  null    | `false`   | description number of the product your customer want to pay to.
| callBackUrl      | `string`  |  your current url page    | `false`   | CallbackUrl is the url you want your customer to be redirected to when payment is successful. The default url is the page url where customer intialized payment.
| splitPaymentReference     | `string`  |  null    | `false`   | A unique identifier generated when setting up a split payment on the Xpress platform. Used to track and manage the split transaction.
| isSplitpayment     | `boolean`  |  null    | `false`   | Indicates whether the transaction should be split during settlement. Set to `true` to enable split payment.
| bodyColor     | `string`  |  null    | `false`   | your prefered customized color for the payment page body.
| buttonColor     | `string`  |  null    | `false`   |  your prefered customized color for the payment page buttons.
| footerText     | `string`  |  null    | `false`   |  your prefered customized text for the payment page footer.
| footerLogo     | `string`  |  null    | `false`   |  your prefered customized logo for the payment page footer.
| metadata      | `object`  |  empty `object`    | `false`   | Object containing any extra information you want recorded with the transaction.

##### Request header
|Name       | Value                | Required | Description   
| :------------ | :------------------- | :------- | :-------------------------------------------------
|Content-type      | `application/json`        | `true`  | The request body format.
| Authorization       | `bearer {publicKey}`        | `true`  |  Your public key from XpressPay. There should be a space in between bearer and the public key

##### Response body
```json
{
    "$id": "1",
    "responseCode": "00",
    "responseMessage": "Authorization URL created",
    "data": {
        "$id": "2",
        "paymentUrl": "https://myxpresspay.com:6003/xxxxxxx",
        "accessCode": "xxxxxxx"
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
    "$id": "1",
    "responseCode": "00",
    "responseMessage": "Transaction retrieved successfully",
    "data": {
        "$id": "2",
        "amount": "90.00",
        "paymentType": "Transfer",
        "currency": "NGN",
        "status": "00",
        "isSuccessful": true,
        "gatewayResponse": "Transaction Successful. 00",
        "transactionId": "12345678",
        "productId": null,
        "productDescription": null,
        "paymentDate": "10/28/2024 8:00:18 PM",
        "meataData": "null",
        "callBackUrl": null,
        "paymentReference": "xxxxxxxxxx",
        "recurringID": null,
        "histories": {
            "$id": "3",
            "$values": []
        },
        "merchantId": 0
    }
}
```
|Param       | Type                 | Description                      
| :------------ | :------------------- | :-------------------------------------------------
| responseCode	| `string`			 |  `00` response code represent that payment was successful on our payment gateway else it failed
| responseMessage | `string`  | description of the response data
| data | `object`          | The below illustrates the data object propertes


#### data object
|Param       | Type                 | Description    
| :------------ | :------------------- | :-------------------------------------------------
| amount | `string`  | amount debited from customer
| currency | `string`  | amount currency
| isSuccessful | `boolean` | shows whether the customer transaction was successful.
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

Please checkout [Xpresspay Documentation](https://github.com) other ways you can integrate with our plugin
## Deployment

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro


