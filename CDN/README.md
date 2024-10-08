# npm_xpressPay

This is a JavaScript library for implementing XpressPay payment gateway

## Demo

![Demo](npm_xpressPay.PNG?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to implement XpressPay Payment to your application via CDN


### Usage

This library can be implemented into your application via CDN using Javascript or JQuery

### Script Source
#### Production : https://myxpresspay.com:6002/xpressPay.min.js
#### Test: https://pgsandbox.xpresspayments.com:8083/xpressPay.min.js


```html
<!DOCTYPE html>
<html>
<style>
    body{
    margin-top: 60px;
    width: 30%;
    left: 0;
    right: 0;
    margin-left: 500px;
    }
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
<body>

<h3>Merchant APP(PG Test)</h3>

<div>
      <p style="text-align: center;"><span id="description"> </span> <span id="amount" style="font-weight: bold;"></span></p>
  <form   method="POST">
    <label for="fname">Email</label>
    <input type="text" id="email" name="firstname" placeholder="Your email..">

    <label for="Amount">Amount</label>
    <input type="text" id="fee" name="amount" placeholder="Amount">
    <label for="country">Currency</label>
    <select  id="country" name="country">
        <option value="NGN">Naira</option>
        <option value="USD">Dollar</option>
        <option value="EURO">EURO</option>
        <option value="GHC">CEDIS</option>
    </select>
  
    <input id="pay" type="submit" value="Pay">
  </form>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" 
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
crossorigin="anonymous"></script>
<!--For Production Use the commented script -->
<!-- <script data-main="scripts/app" src="https://myxpresspay.com:6002/xpressPay.min.js"></script>  -->
<script data-main="scripts/app" src=" https://pgsandbox.xpresspayments.com:8083/xpressPay.min.js"></script> 
<script>
  $(document).ready(function(){
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transactionid'); //From the callback url/current url or any other way you can better implement it;
 XpressPay.VerifyPayment({
        publicKey: "XPPUBK-19995e83ba654840be35242359b66f8c-X",
        transactionId: transactionId,
        mode: "Debug",
      }).then((response) => {
        let amount = response?.data?.amount;
           if (response.success) {
               //Transaction successful at payment gateway
            $("#amount").text("You have payed ")
        } else {
          //Transaction not successful at payment gateway
            $("#amount").text("")
        }
      });

 $("form").submit(function (e) {
        e.preventDefault();
        var email = $("#email").val(); 
        var amount = $("#fee").val();
        $("#pay").val("Paying.........."); 
        const transactionId = Math.floor(Math.random() * 99999999)
        XpressPay.InitialisePayment({
          amount: amount + ".00",
          transactionId: transactionId + "",
          email: email,
          mode: "Debug",
          publicKey: "XPPUBK-19995e83ba654840be35242359b66f8c-X",
          currency: document.getElementById("country").value,
          productId: "1001",
          productDescription: "test",
          callbackUrl: `${window.location.href}?transactionid=${transactionId}`,
          metadata: [
            {
              name: "string",
              value: "string"
            }
          ]
        }).then(response => {
          if (response.success) {
            window.location.href = response.data.authorizeUrl
          } else {
            window.location.href = response.data.authorizeUrl
          }

        });
      });

    });
  </script>
</body>
</html>

```

## Test Cards
|Type of Card       | Card PAN              | Expiry Date  | Pin  | CVV2  | OTP 
| :------------------------------------------------- | :------------------------- | :---------- | :---------- | :---------- | :-----------
| Successful Transactions Card | 5399830000000008  | 05/30 | 123456 | 000 | 123456
| VISA Test Card | 4000000000000002  | 	03/50 | 	N/A | 123
| Insufficient Funds Card | 5061030000000000027  | 01/22 | 1234 | 123
| Exceeds Withdrawal Limit Card | 5061030000000000068  | 01/22 | 1234 | 123


Please checkout [Xpresspay Documentation](https://github.com) other ways you can integrate with our plugin
## Deployment

REMEMBER TO CHANGE THE MODE ON REQUEST OF THE FUNCTIONS WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM


## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
