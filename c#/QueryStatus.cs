using System.Net.Http.Headers;
using static Program;
using Newtonsoft.Json;
using System.Diagnostics;

class Program
{
    public class TransactionStatusDto
    {
        public string transactionId { get; set; }
    }
	string url ="https://pgsandbox.xpresspayments.com:6004/api/Payments/VerifyPayment";
	string publicKey ="XPPUBK-3c0bb71eaac24850b777cd672c223bbc-X";
    static async Task Main(string[] args)
    {
       TransactionStatusDto transactionStatusDto = new() 
       {
           transactionId= "USERTESTING1234"
       };
        try
        {
            // Initialize HttpClient
            using var client = new HttpClient();

            // Create the request
            var request = new HttpRequestMessage(HttpMethod.Post, url);

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
