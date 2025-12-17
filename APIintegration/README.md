## Get Started

This APIs documentation provides a way to integrate our API to any application.

### Usage

This API can be integrated into any application

### Base Urls
#### Test
https://pgsandbox.xpresspayments.com:8090/
use XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X public key for testing
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
      "isApiUser": false,
      "productDescription":"MTN",
      "isSplitpayment": true,
      "logoUrl": "https://logo.png",
      "merchantName":"Test merchant",
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
| isApiUser     | `boolean`  |  null    | `false`   | A flag that tells us if you're connecting directly to our API. Set this to `true` if you're integrating the API yourself..
| merchantName     | `string`  |  null    | `false`   | The name of your business or merchant account. This will be displayed to users during checkout.
| logoUrl     | `string`  |  null    | `false`   | A link to your company or merchant logo. The logo will appear on the payment page to help users recognize your brand..
| bodyColor     | `string`  |  null    | `false`   | your prefered customized color for the payment page body.
| buttonColor     | `string`  |  null    | `false`   |  your prefered customized color for the payment page buttons.
| footerText     | `string`  |  null    | `false`   |  your prefered customized text for the payment page footer.
| footerLogo     | `string`  |  null    | `false`   |  your prefered customized logo for the payment page footer.
| metadata      | `object`  |  empty `object`    | `false`   | Object containing any extra information you want recorded with the transaction.


#### Using Split References in Metadata for Multiple Splitting

When using split payments with the `isSplitpayment` flag set to `true`, you can include split reference identifiers in the metadata to track individual sub-payments. This is particularly useful when a single transaction needs to be divided among multiple purposes or recipients.

##### Split Reference Format

Each item in the metadata `Purpose` field should follow this format:

```
description=amount_splitReference
```

Multiple items should be separated by `&`:

```json
{
  "name": "Purpose",
  "value": "school fee=4000_bd8ce3383dc08bf4bfcd&Logbook for SIWES=1000_5f7a31b8a41b93c2e1de"
}
```

##### Example Usage

```json
{
  "amount": "5000.00",
  "transactionId": "TXN123456",
  "email": "student@university.edu",
  "publicKey": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  "currency": "NGN",
  "isSplitpayment": false,
  "splitPaymentReference": null,
  "metadata": [
    {
      "name": "Purpose",
      "value": "school fee=4000_bd8ce3383dc08bf4bfcd&Logbook for SIWES=1000_5f7a31b8a41b93c2e1de"
    }
  ]
}
```

##### Split Reference Components

| Component | Description | Example |
|-----------|-------------|---------|
| **description** | The purpose or item name for the sub-payment | `school fee`, `Logbook for SIWES` |
| **amount** | The amount allocated to this sub-payment | `4000`, `1000` |
| **splitReference** | Unique identifier for tracking this specific sub-payment | `bd8ce3383dc08bf4bfcd`, `5f7a31b8a41b93c2e1de` |

##### Important Notes

- Each sub-payment must have a unique `splitReference` value for proper tracking and reconciliation
- The sum of all sub-payment amounts should equal the total transaction amount
- Split references are alphanumeric strings that uniquely identify each portion of the split payment
- Use the `&` character to separate multiple sub-payments in the `Purpose` field


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




### Verify Payment (POST Method)
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

### Webhook Implementation

Webhooks allow XpressPay to notify your application in real-time when payment events occur. This ensures your system stays synchronized with payment status changes without requiring constant polling.

#### Setting Up Webhooks

To receive webhook notifications:
1. Create an endpoint on your server to receive POST requests
2. Configure your webhook URL in your XpressPay merchant dashboard
3. Implement proper verification and processing logic

#### Webhook Payload Structure

When a payment event occurs, XpressPay sends a POST request to your configured webhook URL with the following payload:

```json
{
  "Id": 7860602,
  "Amount": "35500.00",
  "PaymentType": "Wallet",
  "Currency": "NGN",
  "Status": "00",
  "IsSuccessful": true,
  "GatewayResponse": "Successful",
  "TransactionId": "TXN123456789",
  "TransactionReference": "XPAY123456789",
  "TransactionDate": "2024-12-10T14:28:00",
  "MetaData": "[{\"Name\":\"customer_info\",\"Value\":\"John Doe\"},{\"Name\":\"payment_code\",\"Value\":\"PAY001\"},\"Name\":\"environment\",\"Value\":\"production\"}]",
  "Merchant": 123,
  "WebhookUrl": "https://yourwebsite.com/api/webhook/xpresspay"
}
```

#### Webhook Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `Id` | `number` | Unique internal transaction ID |
| `Amount` | `string` | Transaction amount |
| `PaymentType` | `string` | Payment method used (Card, Transfer, Wallet, etc.) |
| `Currency` | `string` | Transaction currency (NGN) |
| `Status` | `string` | Transaction status code ("00" = successful) |
| `IsSuccessful` | `boolean` | Whether the transaction was successful |
| `GatewayResponse` | `string` | Response message from payment gateway |
| `TransactionId` | `string` | Your original transaction ID |
| `TransactionReference` | `string` | XpressPay generated transaction reference |
| `TransactionDate` | `string` | Transaction timestamp |
| `MetaData` | `string` | JSON string containing additional transaction data |
| `Merchant` | `number` | Your merchant ID |
| `WebhookUrl` | `string` | The webhook URL that received this notification |

#### Sample Webhook Implementation

##### Node.js/Express Example
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/xpresspay', (req, res) => {
  const payload = req.body;
  
  // Verify the webhook (implement your verification logic)
  if (!verifyWebhook(payload)) {
    return res.status(400).send('Invalid webhook');
  }
  
  // Process the payment notification
  if (payload.IsSuccessful && payload.Status === '00') {
    // Payment successful - update your database
    updatePaymentStatus(payload.TransactionId, 'completed');
    
    // Process metadata if needed
    const metadata = JSON.parse(payload.MetaData);
    processMetadata(metadata);
  } else {
    // Payment failed - handle accordingly
    updatePaymentStatus(payload.TransactionId, 'failed');
  }
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send('OK');
});

function verifyWebhook(payload) {
  // Implement your webhook verification logic here
  // You might want to verify the merchant ID, check signatures, etc.
  return payload.Merchant === YOUR_MERCHANT_ID;
}

function updatePaymentStatus(transactionId, status) {
  // Update your database with the payment status
  console.log(`Updating transaction ${transactionId} to ${status}`);
}

function processMetadata(metadata) {
  // Process additional metadata as needed
  metadata.forEach(item => {
    console.log(`Processing metadata: ${item.Name} = ${item.Value}`);
  });
}
```

##### PHP Example
```php
<?php
// webhook.php

// Get the raw POST data
$input = file_get_contents('php://input');
$payload = json_decode($input, true);

// Verify the webhook
if (!verifyWebhook($payload)) {
    http_response_code(400);
    exit('Invalid webhook');
}

// Process the payment notification
if ($payload['IsSuccessful'] && $payload['Status'] === '00') {
    // Payment successful
    updatePaymentStatus($payload['TransactionId'], 'completed');
    
    // Process metadata
    $metadata = json_decode($payload['MetaData'], true);
    processMetadata($metadata);
} else {
    // Payment failed
    updatePaymentStatus($payload['TransactionId'], 'failed');
}

// Respond with 200 OK
http_response_code(200);
echo 'OK';

function verifyWebhook($payload) {
    // Implement verification logic
    return $payload['Merchant'] == YOUR_MERCHANT_ID;
}

function updatePaymentStatus($transactionId, $status) {
    // Update database
    error_log("Updating transaction $transactionId to $status");
}

function processMetadata($metadata) {
    // Process metadata
    foreach ($metadata as $item) {
        error_log("Processing: {$item['Name']} = {$item['Value']}");
    }
}
?>
```

#### Best Practices

1. **Always respond with HTTP 200**: Return a 200 status code to acknowledge receipt, even if processing fails
2. **Implement idempotency**: Handle duplicate webhook deliveries gracefully
3. **Verify webhook authenticity**: Validate the merchant ID and implement signature verification if available
4. **Process asynchronously**: For complex processing, queue the webhook for background processing
5. **Log webhook events**: Keep detailed logs for debugging and audit purposes
6. **Handle failures gracefully**: Implement retry logic for failed processing
7. **Secure your endpoint**: Use HTTPS and implement proper authentication

#### Webhook Security

- Ensure your webhook endpoint uses HTTPS
- Validate the merchant ID in the payload
- Implement IP whitelisting if XpressPay provides specific IP ranges
- Consider implementing webhook signature verification for additional security

#### Testing Webhooks

During development, you can use tools like:
- **ngrok** to expose your local development server
- **Postman** to simulate webhook requests
- **Webhook testing tools** to validate your implementation

#### Troubleshooting

- **Webhook not received**: Check your URL configuration and firewall settings
- **Duplicate notifications**: Implement idempotency checks using transaction IDs
- **Processing errors**: Always return 200 OK and handle errors in background processing
- **Metadata parsing**: The MetaData field contains escaped JSON that needs proper parsing

Please checkout [Xpresspay Documentation](https://github.com) other ways you can integrate with our plugin
## Deployment

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro