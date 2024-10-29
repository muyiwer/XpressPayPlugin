# XpressPay API Integration

This PHP script is used to initiate a payment request via the Xpress Payments API. The script sends a POST request with necessary data, processes the response, and redirects the user to a payment page in a new tab if the payment initialization is successful.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
  - [PaymentResponse Class](#paymentresponse-class)
  - [API Request](#api-request)
  - [Response Handling](#response-handling)
- [Customization](#customization)
- [Error Handling](#error-handling)
- [Security](#security)
- [License](#license)

## Requirements
- PHP 7.4 or higher
- `cURL` enabled in PHP
- Xpress Payments API key (test or live)

## Installation
1. Clone this script to your project directory.
2. Ensure your PHP environment has `cURL` enabled.
3. Obtain your API key from [Xpress Payments](https://www.xpresspayments.com).

## Usage
1. **Configure API Key and URL**  
   Replace the `$bearerToken` value with your Xpress Payments API key in the script.
   
2. **Customize Payment Data**  
   Adjust the `$data` array with appropriate payment details, including:
   - `email` — Customer's email
   - `amount` — Payment amount
   - `transactionId` — Unique transaction ID
   - `callbackUrl` — URL for redirect after payment completion

3. **Run the Script**  
   Call this PHP script as part of your payment flow when a user initiates a payment.

## Code Structure

### PaymentResponse Class
This class is a basic data model for handling the API response, containing fields like:
- `id`: Payment ID
- `responseCode`: Code indicating the status of the request
- `responseMessage`: Message from the API
- `data`: Additional data, like the `paymentUrl`

### API Request
The API request is sent via `cURL`, with headers set for JSON format and authorization.

```php
$url = "https://pgsandbox.xpresspayments.com:8090/api/Payments/Initialize";
$bearerToken = "Your-API-Key"; // replace with actual API key

$data = [
    "email" => "user@example.com",
    "amount" => "100",
    "transactionId" => "unique_transaction_id",
    "currency" => "NGN",
    "callbackUrl" => "https://example.com/callback",
    "metadata" => [["name" => "extra_data", "value" => "example"]],
    "productId" => "product_id",
    "productDescription" => "product description",
    "applyConviniencyCharge" => true,
    "mode" => "live"
];
$bearerToken = "XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X";
```

**cURL Configuration:**

- Sets headers for JSON content and authorization.
- Sets SSL verification for secure requests.
- Sends the request with POST data.

### Response Handling

- The API response is parsed into a `PaymentResponse` object.
- If `responseCode` is `00` and a payment URL is present, JavaScript will open the URL in a new browser tab with a delay of 1 second.

```php
if ($paymentResponse->responseCode === '00' && $paymentResponse->hasPaymentUrl()) {
    $paymentUrl = htmlspecialchars($paymentResponse->data['paymentUrl'], ENT_QUOTES, 'UTF-8');
    echo "<script type='text/javascript'>
            setTimeout(function() {
                window.open('$paymentUrl', '_blank');
            }, 1000);
          </script>";
    echo "<p>Please wait while we redirect you to the payment page...</p>";
}
```

### Error Handling

- If `cURL` fails, an exception is thrown with a descriptive message.
- JSON parsing errors are also caught and reported to ensure smooth debugging.

```php
if ($response === false) {
    throw new Exception('cURL Error: ' . curl_error($ch));
}
if (json_last_error() !== JSON_ERROR_NONE) {
    throw new Exception('Error decoding JSON response: ' . json_last_error_msg());
}
```

### Security Considerations

- API Key: Ensure that your API key is stored securely and never exposed publicly.
- HTTPS Only: Use HTTPS endpoints to prevent data interception.
- Escape Output: Use `htmlspecialchars` to prevent XSS attacks by sanitizing output.

### Customization
- Payment Parameters: Adjust values like `amount`, `transactionId`, `callbackUrl`, etc., as per your requirements.
- Redirect Delay: Modify the JavaScript delay to customize the user experience.

### License
This script is free to use and distribute under the MIT License. Make sure to replace sensitive values before deploying in production.