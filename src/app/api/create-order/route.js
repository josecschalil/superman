import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  console.log(body.amount);
  const rupeeAmount = body.amount || 500; // Fallback to ₹500 if not sent
  const amount = rupeeAmount * 100; // Convert to paise

  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
