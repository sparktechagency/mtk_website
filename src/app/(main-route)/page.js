// import Collecting from "@/components/home/Collecting";
// import Faq from "@/components/home/Faq";
// import Hero from "@/components/home/Hero";
// import Quality from "@/components/home/Quality";
// import Testimonials from "@/components/home/Testimonials";
// import TrendingCarousel from "@/components/home/TrendingCarousel";
"use client";
import Checkout from "@/components/CheckOutPage/CheckOut";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RPeq5EPhiYPoTtRQq6WRrsC4qCp72zDsBonsyDLnX1Sm2We345yHvZiATaWGhP0dFhOfdsIiutrIKvSrJIY6hNf00METLh07g");

export default function Home() {
  const amount = 10.99;
  return (
    <>
      {/* <Hero />
      <Quality />
      <Collecting />
      <TrendingCarousel />
      <Testimonials />
      <Faq /> */}
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">shawon </h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <Checkout amount={amount} />
      </Elements>
    </main>
    </>
  );
}
