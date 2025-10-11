/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";


const PaymentRequestButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: { label: "Test Payment", amount: 5000 },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });

    pr.on("paymentmethod", async (e) => {
      const res = await fetch("http://localhost:9090/api/v1/payment/create-google-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000, currency: "usd" }),
      });

      const { clientSecret } = await res.json();
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: e.paymentMethod.id },
        { handleActions: false }
      );

      if (error) e.complete("fail");
      else e.complete("success");
      alert("✅ Payment Successful!");
    });
  }, [stripe, elements]);

  if (!paymentRequest) return null;

  return (
    <PaymentRequestButtonElement
      options={{ paymentRequest }}
      className="w-full max-w-sm"
    />
  );
}


export default PaymentRequestButton;

