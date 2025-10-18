import { NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-04-10",
// });

const stripe = new Stripe("sk_test_51RPeq5EPhiYPoTtRbF71mzMsIHDSVdtrMFYrLTRjhJML9LB4NtrzLk3uatfjUQK9N4lLdhDH3uAnyUfPD074MVmq00qGy09wJo", {
  apiVersion: "2024-04-10",
});

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // amount should already be in cents (subunits)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}