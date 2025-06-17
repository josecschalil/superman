// pages/checkout.js
"use client";

import { loadRazorpayScript } from "@/lib/razorpay";

export default function Checkout() {
  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Inside handlePayment in checkout.js
    const amountInRupees = 799; // Or get from cart, input, etc.
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amountInRupees }), // 💰 send rupee value
    });

    const data = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from Razorpay Dashboard
      amount: data.amount, // in paise (i.e., ₹1 = 100)
      currency: data.currency,
      name: "My Store",
      description: "Purchase Description",
      order_id: data.id,
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
        // Send response to your backend for verification
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="py-50 px-50">
      <h1>Checkout</h1>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}
