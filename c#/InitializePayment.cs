using System.Net.Http.Headers;
using static Program;
using Newtonsoft.Json;
using System.Diagnostics;

class Program
{

    public class InitializePaymentRequestObject
    {
        public string amount { get; set; }
        public string transactionId { get; set; }
        public string email { get; set; }
        public string mode { get; set; }
        public string currency { get; set; }
        public string? productId { get; set; }
        public bool applyConviniencyCharge { get; set; }
        public bool IsRecurring { get; set; }
        public string? productDescription { get; set; }
        public string callbackUrl { get; set; }
        public List<Metadata>? metadata { get; set; }
     }
    public class Metadata
    {
        public string? name { get; set; }
        public string? value { get; set; }
    }
    public class InitializeResponseObject
    {
        public string id { get; set; }
        public string responseCode { get; set; }
        public string responseMessage { get; set; }
        public Data data { get; set; }
    }
    public class Data
    {
        public string id { get; set; }
        public string paymentUrl { get; set; }
        public string accessCode { get; set; }
    }
	string url ="https://pgsandbox.xpresspayments.com:6004/api/Payments/Initialize";
	string queryUrl ="https://pgsandbox.xpresspayments.com:6004/api/Payments/VerifyPayment";
	string publicKey ="XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X";
    static async Task Main(string[] args)
    {
       
    }
	public async Task<object> initializePayment()
	{
		 //Create your request object with the parameters
        List<Metadata> metadatas = new();
        Metadata metadata = new()
        {
            name = "string",
            value = "string"
        };
        metadatas.Add(metadata);

        InitializePaymentRequestObject paymentRequestObject = new()
        {

            email = "user@mail.com",
            amount = "100",
            transactionId = "USERTESTING1234",
            currency = "NGN",
            callbackUrl = "https://linktr.ee/xpresspayment",
            metadata = metadatas,
            productId = "string",
            productDescription = "string",
            applyConviniencyCharge = true,
            mode = "string",
            IsRecurring = false
        };

        try
        {

            // Initialize HttpClient
            using var client = new HttpClient();

            // Create the request
            var request = new HttpRequestMessage(HttpMethod.Post, url);

            // Add Authorization header
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", publicKey);

            // Set the request content
            request.Content = new StringContent(JsonConvert.SerializeObject(paymentRequestObject), System.Text.Encoding.UTF8, "application/json");

            // Send the request
            var response = await client.SendAsync(request);

            //Check if the call return successful
            if (response.IsSuccessStatusCode)
            {
                // Read and deserilize the response content
                var responseContent = await response.Content.ReadAsStringAsync();
                InitializeResponseObject responseObject = JsonConvert.DeserializeObject<InitializeResponseObject>(responseContent);
                
                
                // Redirect or Open the payment URL in the default web browser to complete the payment
                Process.Start(new ProcessStartInfo
                {
                    FileName = responseObject.data.paymentUrl,
                    UseShellExecute = true // This is important for opening URLs
                });
            }
            Console.WriteLine("Response: " + response.Content.ReadAsStringAsync());
        }
        catch (HttpRequestException ex)
        {
            // Handle request exceptions
            Console.WriteLine($"Request error: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Handle other exceptions
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
	}
	
	public async Task<object> QueryStatus(string transactionId)
	{
       TransactionStatusDto transactionStatusDto = new() 
       {
           transactionId= transactionId
       };
        try
        {
            // Initialize HttpClient
            using var client = new HttpClient();

            // Create the request
            var request = new HttpRequestMessage(HttpMethod.Post, queryUrl);

            // Add Authorization header
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", publicKey);
            request.Content = new StringContent(JsonConvert.SerializeObject(transactionStatusDto), System.Text.Encoding.UTF8, "application/json");

            // Send the request
            var response = await client.SendAsync(request);
            // Ensure the request was successful
            response.EnsureSuccessStatusCode();
            // Read and output the response content
            var responseContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Response: " + responseContent);
        }
        catch (HttpRequestException ex)
        {
            // Handle request exceptions
            Console.WriteLine($"Request error: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Handle other exceptions
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}