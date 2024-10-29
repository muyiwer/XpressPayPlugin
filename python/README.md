# XpressPay API Integration

This Python script demonstrates how to initialize a payment request using the Xpress Payments API. It constructs a payment request, sends it to the API, and, if successful, opens the resulting payment URL in the default web browser.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Configuration](#Configuration)
- [Usage](#usage)
  - [Classes Overview](#paymentresponse-class)
  - [Running the Script](#script-run)
- [Example Payload](#customization)
- [Script Structure](#script)
- [Error Handling](#error-handling)
- [Dependencies](#Dependencies)
- [License](#license)

## Prerequisites

- Python 3.6 or higher
- Required packages: Install `requests` via pip
  ```bash
  pip install requests
  ```

## Configuration

To configure the script for use with the Xpress Payments API, follow these steps:

### 1. Set Up Your Authorization Token

Get your **Authorization Token** from Xpress Payments. Replace `<Your-Token>` in the `headers` dictionary with your actual token.

```python
headers = {
    "Authorization": "Bearer <Your-Token>",
    "Content-Type": "application/json"
}
```

## Usage

### Classes Overview

1. **Metadata Class:** A simple class to represent custom metadata with name and value attributes.

2. **InitializePaymentRequestObject Class:** This class models the structure of the payment request. It includes:   

- `amount`: Payment amount
- `transaction_id`: Unique transaction ID
- `email`: User email
- `currency`: Currency code (e.g., NGN)
- `callback_url`: URL to redirect after payment
- `metadata`: List of `Metadata` instances for additional data

### Running the Script

1. **Define Metadata and Payment Request:**
Update the transaction details (amount, transaction ID, email, etc.) in the `InitializePaymentRequestObject`.
2. **Run the script:**

```bash
python payment_initialization.py
```
3. **Response Handling:**

- On success, the script opens the payment URL in your web browser.
- If the transaction fails, it prints the error message.

## Example Payload
Below is an example of the JSON payload sent to the API:

```json
{
    "amount": "100",
    "transactionId": "USERTESTING1234",
    "email": "user@mail.com",
    "mode": "string",
    "currency": "NGN",
    "productId": "string",
    "applyConviniencyCharge": true,
    "isRecurring": false,
    "productDescription": "string",
    "callbackUrl": "https://linktr.ee/xpresspayment",
    "metadata": [
        {
            "name": "string",
            "value": "string"
        }
    ]
}
```
## Script Structure
1. **API Request:** The script sends a POST request to

2. **Response Handling:** Checks for a `200` response and opens the payment link in the browser if the `responseCode` is `"00"`. Otherwise, displays the error message.

## Error Handling
- RequestException: Handles network-related errors.
- General Exception: Catches other errors with a descriptive message.

## Dependencies
```bash
pip install requests
```

## License
This code is provided as-is for demonstration purposes and may require modification based on specific business use cases.