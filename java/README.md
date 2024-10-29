# XpressPay API Integration

This is a Java client for initializing payments via the XpressPayments API. It creates a payment request payload in JSON format and sends it to the API, handling the response and any errors that occur.

## Table of Contents
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Classes Overview](#classes-overview)
  - [Metadata](#metadata)
  - [InitializePaymentRequestObject](#initializepaymentrequestobject)
  - [PaymentInitializer](#paymentinitializer)
- [Example Output](#example-output)
- [Error Handling](#error-handling)
- [License](#license)

## Requirements

- Java 8 or higher
- XpressPayments API key
- Internet connection for API requests

## Setup

1. Clone this repository or copy the code to your Java environment.
2. Replace `"Bearer XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X"` with your actual API key.
3. Ensure the API URL in the code matches the endpoint URL provided by XpressPayments.

## Usage

1. Configure your `Metadata` and `InitializePaymentRequestObject` as shown in `PaymentInitializer.java`.
2. Run the program to send a payment request to the API.
3. The program will print the response from the API, or an error message if the request fails.

```java
// Main method example usage
public static void main(String[] args) {
    List<Metadata> metadataList = new ArrayList<>();
    metadataList.add(new Metadata("description", "test value"));

    InitializePaymentRequestObject paymentRequestObject = new InitializePaymentRequestObject(
            "100",
            "USERTEST1234",
            "user@example.com",
            "online",
            "NGN",
            "PROD123",
            true,
            false,
            "Test Product",
            "https://yourcallbackurl.com",
            metadataList
    );

    // Sending the request and handling the response in PaymentInitializer.java
}
```

## Class Overview

### Metadata

The `Metadata` class is used to store additional key-value information to include in the API request metadata.

- Represents additional information for the transaction.
- **Constructor**
  ```java
  public Metadata(String name, String value)
  ```
  - Method: `toJson()`, returns JSON format of the metadata.

  ### InitializePaymentRequestObject

  - Builds the main payload with details like amount, transaction ID, email, etc.
- **Constructor**
`InitializePaymentRequestObject(String amount, String transactionId, String email, ...)`
  - Method: `toJson()`, returns JSON format of the metadata.

  ### PaymentInitializer
- Sends the request to the API and handles the response.
- Sets up the HTTP connection, sends the JSON payload, and reads the response.
- Displays either a success message with response details or an error message.

## Example Output

A successful response might look like this:

```json
{
    "data": {
        "paymentUrl": "https://paymentgateway.com/link"
    },
    "status": "success"
}
```

To open the `paymentUrl` in a browser, you can modify the code with JSON parsing and URI handling:

```java
JSONObject jsonResponse = new JSONObject(responseBody);
String paymentUrl = jsonResponse.getJSONObject("data").getString("paymentUrl");
Desktop.getDesktop().browse(new URI(paymentUrl));
```

## Error Handling
- If the request fails, the program prints the HTTP response code and error message.
- Exceptions such as connection issues or parsing errors are printed to help debugging.

## License
This project is licensed under the CBN License.

