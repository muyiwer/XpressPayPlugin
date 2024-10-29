import requests
import webbrowser
import json

class Metadata:
    def __init__(self, name, value):
        self.name = name
        self.value = value

class InitializePaymentRequestObject:
    def __init__(self, amount, transaction_id, email, mode, currency, product_id, 
                 apply_conveniency_charge, is_recurring, product_description, callback_url, metadata):
        self.amount = amount
        self.transactionId = transaction_id
        self.email = email
        self.mode = mode
        self.currency = currency
        self.productId = product_id
        self.applyConviniencyCharge = apply_conveniency_charge
        self.isRecurring = is_recurring
        self.productDescription = product_description
        self.callbackUrl = callback_url
        self.metadata = metadata

# Create metadata and payment request object
metadata = Metadata("string", "string")
payment_request_object = InitializePaymentRequestObject(
    amount="100",
    transaction_id="USERTESTING1234",
    email="user@mail.com",
    mode="string",
    currency="NGN",
    product_id="string",
    apply_conveniency_charge=True,
    is_recurring=False,
    product_description="string",
    callback_url="https://linktr.ee/xpresspayment",
    metadata=[metadata]
)

# Convert the request object to JSON
request_data = {
    "amount": payment_request_object.amount,
    "transactionId": payment_request_object.transactionId,
    "email": payment_request_object.email,
    "mode": payment_request_object.mode,
    "currency": payment_request_object.currency,
    "productId": payment_request_object.productId,
    "applyConviniencyCharge": payment_request_object.applyConviniencyCharge,
    "isRecurring": payment_request_object.isRecurring,
    "productDescription": payment_request_object.productDescription,
    "callbackUrl": payment_request_object.callbackUrl,
    "metadata": [{"name": m.name, "value": m.value} for m in payment_request_object.metadata]
}

try:
    # Send the request
    headers = {
        "Authorization": "Bearer XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X",
        "Content-Type": "application/json"
    }
    response = requests.post("https://pgsandbox.xpresspayments.com:6004/api/Payments/Initialize", 
                             headers=headers, json=request_data)

    # Check if the call returned successful
    if response.status_code == 200:
        response_object = response.json()
        
        # If successful, open the payment URL in the default web browser
        if response_object['responseCode'] == "00":
            payment_url = response_object['data']['paymentUrl']
            webbrowser.open(payment_url)
        else:
            print(f"Error: {response_object['responseMessage']}")
    else:
        print(f"Error: {response.status_code} - {response.text}")

except requests.RequestException as e:
    print(f"Request error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")