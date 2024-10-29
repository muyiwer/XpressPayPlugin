# XpressPay API Integration

This project provides a .NET-based integration with the Xpress Payments API for initializing and verifying payments. The code interacts with Xpress Payments' sandbox environment and includes methods for creating and tracking payment transactions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Classes and Properties](#classes-and-properties)
- [Methods](#methods)
- [Error Handling](#error-handling)

---

## Prerequisites

- .NET SDK
- Newtonsoft.Json package
- Xpress Payments API Public Key

---

## Setup

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    Make sure to add `Newtonsoft.Json` to your project by running:
    ```bash
    dotnet add package Newtonsoft.Json
    ```

3. **Set up the `publicKey` variable** with your API public key in `Program.cs`:
    ```csharp
    string publicKey = "XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X";
    ```

---

## Usage

This integration allows two main actions:
1. **Initialize a Payment**
2. **Query Payment Status**

### Initialize a Payment

Check the `initializePayment` method to initiate a payment on the `InitializePayment.cs` file. If successful, the payment URL will open in the user's default web browser.


### Query Payment Status

Check the `QueryStatus` method to verify the status of a payment, and pass in the transactionId on the `InitializePayment.cs` file.

## Classes and Properties

### InitializePaymentRequestObject

Defines the payment initialization request structure

|Property       | Type                 |  Description                      
| :------------ | :------------------- |  :-------------------------------------------------
| amount        | `string`             | Amount to charge.
| transactionId     | `string`             | Unique identifier for the transaction.
| email          | `string`             | Customer email address.
| mode          | `string`             | Payment mode (test/live).
| currency          | `string`             | Currency code (e.g., NGN, USD).
| productId          | `string?`             | Optional product ID.
| applyConviniencyCharge          | `bool`             | If convenience charge should apply.
| IsRecurring          | `bool`             | Specifies if payment is recurring.
| productDescription          | `string?`             | Description of the product/service.
| callbackUrl          | `string`             | URL to redirect to after payment.
| metadata          | `List<Metadata>?`             | Additional data in key-value format.

### Metadata

Represents optional metadata for additional details about the transaction.

|Property       | Type                 |  Description                      
| :------------ | :------------------- |  :-------------------------------------------------
| name        | `string?`             | Metadata field name
| value     | `string?`             | Metadata field value

### InitializeResponseObject

Defines the structure of the response from the payment initialization request.

|Property       | Type                 |  Description                      
| :------------ | :------------------- |  :-------------------------------------------------
| id        | `string`             | ID of the transaction.
| responseCode     | `string`             | Response code from the API.
| responseMessage          | `string`             | Message associated with the response.
| mode          | `Data`             | Contains payment URL and access code.

### Data

Nested in InitializeResponseObject, contains details like the payment URL.

|Property       | Type                 |  Description                      
| :------------ | :------------------- |  :-------------------------------------------------
| id        | `string`             | Transaction ID.
| paymentUrl          | `string`             | 	URL for completing the payment.
| accessCode          | `string`             | Access code for the transaction.

## Methods

### initializePayment()

This method initializes a payment using the InitializePaymentRequestObject. If successful, it opens the payment URL in the user's default web browser.

```csharp
var response = await initializePayment();
```

### QueryStatus(transactionId)
This method queries the status of a specific transaction by transaction ID, sending the request to the Verify Payment endpoint.

```csharp
await QueryStatus("123456");
```

## Error Handling
The integration includes error handling for `HttpRequestException` for network-related errors and general `Exception` handling for other issues.

## License
This project is licensed under the CBN License.