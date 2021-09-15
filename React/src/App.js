/* eslint-disable react-hooks/exhaustive-deps */
import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import XPay from "npm_xpresspay";

function App() {
  const [state, setState] = useState({
    amount: "",
    loading: false,
    transactions: [],
  });
  function OnClickPayButton() {
    let transactionId = "Test" + Math.floor(Math.random() * 1000000);
    setState({ ...state, loading: true });
    try {
      XPay.InitialisePayment({
        amount: "1000",
        transactionId: transactionId,
        email: "sample@test.com",
        publicKey: "xxxxxxxxxxxxxxxxxxxx",
        currency: "NGN",
        mode: "Debug",
        callbackUrl: window.location.href,
        metadata: [
          {
            name: "sample",
            value: "test",
          },
        ],
      }).then((response) => {
        if (response.success) {
          setState({ ...state, loading: false });
          sessionStorage.setItem("tranId", transactionId); // it can be saved to Database.
          sessionStorage.setItem("reference", response.data?.reference); // it can be saved to Database
          window.location.href = response.data?.authorizeUrl;
        } else {
          setState({ ...state, loading: false });
          window.location.href = response.data?.authorizeUrl;
        }
      });
    } catch (error) {
      //handle error
    }
  }

  function VerifyPayment() {
    try {
      const tranId =
        localStorage.getItem("tranId") === null
          ? ""
          : localStorage.getItem("tranId");
      console.log(tranId);
      XPay.VerifyPayment({
        publicKey: "xxxxxxxxxxxxxx",
        transactionId: tranId,
        mode: "Debug",
      }).then((response) => {
        let amount = response?.data?.amount;
        if (amount) {
          setState({ ...state, amount, transactions: response.data.history });
        } else {
          setState({ ...state, amount: "" });
        }
      });
    } catch (error) {
      //handle error
      setState({ ...state, amount: "" });
    }
  }
  useEffect(() => {
    // or ComponentDidMount if you are using class component
    VerifyPayment();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {state.amount?.length > 0 ? (
          <p>
            You have paid <code>{state.amount}</code>
          </p>
        ) : (
          ""
        )}
        <button
          onClick={() => OnClickPayButton()}
          style={{
            backgroundColor: state.loading ? "#afdbb1" : "",
            height: "30px",
            width: "120px",
            borderRadius: "5px",
            background: "#3cbe3c",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          disabled={state.loading ? true : false}
          type="submit"
        >
          {state.loading ? "Paying" : " Pay 1,000"}
        </button>
      </header>
    </div>
  );
}

export default App;
