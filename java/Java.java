import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

class Metadata {
    private String name;
    private String value;

    public Metadata(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String toJson() {
        return String.format("{\"name\":\"%s\",\"value\":\"%s\"}", name, value);
    }
}

class InitializePaymentRequestObject {
    private String amount;
    private String transactionId;
    private String email;
    private String mode;
    private String currency;
    private String productId;
    private boolean applyConviniencyCharge;
    private boolean isRecurring;
    private String productDescription;
    private String callbackUrl;
    private List<Metadata> metadata;

    public InitializePaymentRequestObject(String amount, String transactionId, String email, String mode,
                                           String currency, String productId, boolean applyConviniencyCharge,
                                           boolean isRecurring, String productDescription, String callbackUrl,
                                           List<Metadata> metadata) {
        this.amount = amount;
        this.transactionId = transactionId;
        this.email = email;
        this.mode = mode;
        this.currency = currency;
        this.productId = productId;
        this.applyConviniencyCharge = applyConviniencyCharge;
        this.isRecurring = isRecurring;
        this.productDescription = productDescription;
        this.callbackUrl = callbackUrl;
        this.metadata = metadata;
    }

    public String toJson() {
        StringBuilder metadataJson = new StringBuilder("[");
        for (int i = 0; i < metadata.size(); i++) {
            metadataJson.append(metadata.get(i).toJson());
            if (i < metadata.size() - 1) {
                metadataJson.append(",");
            }
        }
        metadataJson.append("]");

        return String.format("{\"amount\":\"%s\",\"transactionId\":\"%s\",\"email\":\"%s\",\"mode\":\"%s\",\"currency\":\"%s\",\"productId\":\"%s\",\"applyConviniencyCharge\":%b,\"isRecurring\":%b,\"productDescription\":\"%s\",\"callbackUrl\":\"%s\",\"metadata\":%s}",
                amount, transactionId, email, mode, currency, productId, applyConviniencyCharge, isRecurring, productDescription, callbackUrl, metadataJson);
    }
}

public class PaymentInitializer {

    public static void main(String[] args) {
        // Create metadata and payment request object
        List<Metadata> metadataList = new ArrayList<>();
        metadataList.add(new Metadata("string", "string"));

        InitializePaymentRequestObject paymentRequestObject = new InitializePaymentRequestObject(
                "100",
                "USERTESTING1234",
                "user@mail.com",
                "string",
                "NGN",
                "string",
                true,
                false,
                "string",
                "https://linktr.ee/xpresspayment",
                metadataList
        );

        try {
            // Initialize HTTP connection
            URL url = new URL("https://pgsandbox.xpresspayments.com:6004/api/Payments/Initialize");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            // Send the request
            OutputStream os = connection.getOutputStream();
            os.write(paymentRequestObject.toJson().getBytes());
            os.flush();
            os.close();

            // Check the response
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // Process the response
                String responseBody = response.toString();
                System.out.println("Response: " + responseBody);

                // Parse the response to extract payment URL (pseudo-code)
                // Assuming you have a JSON library to parse
                // JSONObject jsonResponse = new JSONObject(responseBody);
                // String paymentUrl = jsonResponse.getJSONObject("data").getString("paymentUrl");
                // Open the URL in the default browser
                // Desktop.getDesktop().browse(new URI(paymentUrl));
            } else {
                System.out.println("Error: " + responseCode + " - " + connection.getResponseMessage());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}