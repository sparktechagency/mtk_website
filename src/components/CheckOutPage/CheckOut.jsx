// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
//   PaymentRequestButtonElement,
// } from "@stripe/react-stripe-js";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";

// interface CheckoutPageProps {
//   amount: number;
// }

// const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [paymentRequest, setPaymentRequest] = useState<any>(null);

//   // Create PaymentIntent on server
//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [amount]);

//   // Initialize Google Pay / Apple Pay
//   useEffect(() => {
//     if (!stripe || !clientSecret) return;

//     const pr = stripe.paymentRequest({
//       country: "US",
//       currency: "usd",
//       total: {
//         label: "Total",
//         amount: convertToSubcurrency(amount),
//       },
//       requestPayerName: true,
//       requestPayerEmail: true,
//     });

//     pr.canMakePayment().then((result) => {
//       if (result) setPaymentRequest(pr);
//     });

//     // Handle payment method submission from Google Pay / Apple Pay
//     pr.on("paymentmethod", async (ev: any) => {
//       setLoading(true);
//       const { error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: ev.paymentMethod.id,
//       });

//       if (error) {
//         setErrorMessage(error.message);
//         ev.complete("fail");
//       } else {
//         ev.complete("success");
//         window.location.href = `/payment-success?amount=${amount}`;
//       }
//       setLoading(false);
//     });
//   }, [stripe, clientSecret, amount]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) return;

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://localhost:3000/payment-success?amount=${amount}`,
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     }

//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//           role="status"
//         >
//           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md space-y-4">
//       {/* Google Pay / Apple Pay button */}
//       {paymentRequest && (
//         <div className="mb-4">
//           <PaymentRequestButtonElement options={{ paymentRequest }} />
//         </div>
//       )}

//       {/* Standard PaymentElement for cards */}
//       <PaymentElement />

//       {/* Error message */}
//       {errorMessage && <div className="text-red-500">{errorMessage}</div>}

//       {/* Submit button */}
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
//       >
//         {!loading ? `Pay $${amount}` : "Processing..."}
//       </button>
//     </form>
//   );
// };

// export default CheckoutPage;








"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubCurrency";


const Checkout = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [paymentRequest, setPaymentRequest] = useState(null);

  // Create PaymentIntent on the server
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  // Initialize Google Pay / Apple Pay button
  useEffect(() => {
    if (!stripe || !clientSecret) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Total",
        amount: convertToSubcurrency(amount),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) setPaymentRequest(pr);
    });

    // Handle payment method from Google Pay / Apple Pay
    pr.on("paymentmethod", async (ev) => {
      setLoading(true);
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: ev.paymentMethod.id,
      });

      if (error) {
        setErrorMessage(error.message);
        ev.complete("fail");
      } else {
        ev.complete("success");
        window.location.href = `/payment-success?amount=${amount}`;
      }
      setLoading(false);
    });
  }, [stripe, clientSecret, amount]);

  // Handle standard card form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // ✅ Must submit elements before confirming payment
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  // Loading spinner if Stripe or clientSecret is not ready
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md space-y-4">
      {/* Google Pay / Apple Pay button */}
      {paymentRequest && (
        <div className="mb-4">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}

      {/* Standard PaymentElement for cards */}
      <PaymentElement />

      {/* Error message */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default Checkout;