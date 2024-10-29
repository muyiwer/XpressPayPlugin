<?php

class PaymentResponse {
    public $id;
    public $responseCode;
    public $responseMessage;
    public $data;

    public function __construct($id, $responseCode, $responseMessage, $data) {
        $this->id = $id;
        $this->responseCode = $responseCode;
        $this->responseMessage = $responseMessage;
        $this->data = $data;
    }

    public function hasPaymentUrl() {
        return isset($this->data['paymentUrl']);
    }
}

try {
    // URL for the API request
    $url = "https://pgsandbox.xpresspayments.com:8090/api/Payments/Initialize";

    // Data to be sent in JSON format
    $data = [
        "email" => "adio4sure@gmail.com",
        "amount" => "10",
        "transactionId" => "866866127398849",
        "currency" => "NGN",
        "callbackUrl" => "https://google.com", //the url to redirect your user to after the payment
        "metadata" => [
            [
                "name" => "something",
                "value" => "something"
            ]
        ],  //can be null
        "productId" => "string",//can be null
        "productDescription" => "string",//can be null
        "applyConviniencyCharge" => true,
        "mode" => "string"
    ];

    // Your Bearer token (public key)
    $bearerToken = "XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X"; //(this is for test only) Replace with your actual token

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' . $bearerToken
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);

    if ($response === false) {
        throw new Exception('cURL Error: ' . curl_error($ch));
    }

    $responseData = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error decoding JSON response: ' . json_last_error_msg());
    }

    // An instance the expected PaymentResponse
    $paymentResponse = new PaymentResponse(
        $responseData['id'] ?? null,
        $responseData['responseCode'] ?? null,
        $responseData['responseMessage'] ?? null,
        $responseData['data'] ?? []
    );

    if ($paymentResponse->responseCode === '00' && $paymentResponse->hasPaymentUrl()) {
        $paymentUrl = htmlspecialchars($paymentResponse->data['paymentUrl'], ENT_QUOTES, 'UTF-8');

        // Output JavaScript to open the payment URL in a new tab with a delay
        echo "<script type='text/javascript'>
                setTimeout(function() {
                    window.open('$paymentUrl', '_blank');
                }, 1000); // Delay of 1 second
              </script>";
        echo "<p>Please wait while we redirect you to the payment page...</p>";
    } else {
        echo 'Error: ' . htmlspecialchars($paymentResponse->responseMessage, ENT_QUOTES, 'UTF-8');
    }

} catch (Exception $e) {
    echo 'Caught exception: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8') . "\n";
} finally {
    if (isset($ch) && is_resource($ch)) {
        curl_close($ch);
    }
}
?>