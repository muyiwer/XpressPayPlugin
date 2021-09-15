# npm_xpressPay

This is a JavaScript library for implementing XpressPay payment gateway

## Demo

![Demo](npm_xpressPay.PNG?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to implement XpressPay Payment to your application via CDN


### Usage

This library can be implemented into your application via CDN using Javascript or JQuery


### 1. Using React

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

    <label for="lname">Amount</label>
    <input type="text" id="amount" name="lastname" placeholder="Amount">
    <label for="country">Currency</label>
    <select  id="country" name="country">
        <option value="NGN">Naira</option>
        <option value="USD">Dollar</option>
        <option value="EURO">EURO</option>
        <option value="GHC">CEDIS</option>
    </select>
  
    <input type="submit" value="Pay">
  </form>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js" 
integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
crossorigin="anonymous"></script>
<!-- <script type="module" src="./index.js"></script> --->
<script data-main="scripts/app" src="http://172.22.54.111:8020/xpressPay.min.js"></script> 
<script>
  $(document).ready(function(){
 XpressPay.VerifyPayment({
        publicKey: "XPPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
        transactionId:  sessionStorage.getItem("tranId") === null  ? "" : sessionStorage.getItem("tranId"),
        mode: "Debug",
      }).then((response) => {
          console.log("object", response)
        let amount = response?.data?.amount;
         if (amount) {
            $("#amount").text("You have payed ")
        } else {
            $("#amount").text("")
        }
      });

    $("form").submit(function(e){
        e.preventDefault()
        let email = document.getElementById("email").value;
        let amount = document.getElementById("amount").value;
        XpressPay.InitialisePayment({
            amount: amount + "",
            transactionId: "1234567",
            email: email,
            publicKey: "XPPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
            currency: document.getElementById("country").value,
            callbackUrl: window.location.href,
            metadata: [
                {
                    name: "string",
                    value: "string"
                }
            ]
        }).then(response => { 
            if(response.success){
                window.location.href = response.data.authorizeUrl
            }else{
                window.location.href = response.data.authorizeUrl
            }
            
        });
});
   
});
</script>
</body>
</html>

```
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
