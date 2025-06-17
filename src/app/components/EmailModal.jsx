"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { loadRazorpayScript } from "@/lib/razorpay";

import { ShoppingCart } from "lucide-react";
const EmailModalComponent = ({ price, preset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

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

  useEffect(() => {
    if (isOpen) {
      const emailInput = modalRef.current?.querySelector('input[type="email"]');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
      }

      document.body.style.overflow = "hidden";

      const handleEscape = (e) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };
  const { isDarkMode } = useThemeContext();

  const handleProceed = () => {
    if (!email) {
      setIsValidEmail(false);
      return;
    }
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    // Handle email submission here
    localStorage.setItem("email", email);
    localStorage.setItem("preset", preset);
    handlePayment();
    setEmail("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleProceed();
    }
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-md font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
        aria-haspopup="dialog"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Buy Now - ${price}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOutsideClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
              isDarkMode ? "bg-black/60" : "bg-black/40"
            }`}
          />

          <div
            ref={modalRef}
            className={`relative transform transition-all duration-300 scale-100 opacity-100 w-full max-w-md mx-auto ${
              isDarkMode
                ? "bg-gray-900/95 border-gray-700/50 text-white"
                : "bg-white/95 border-gray-200/50 text-gray-900"
            } backdrop-blur-xl border rounded-2xl shadow-2xl`}
          >
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    isDarkMode ? "bg-blue-500/10" : "bg-blue-50"
                  }`}
                >
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <h2
                  id="modal-title"
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Get Download Link
                </h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode
                    ? "hover:bg-gray-800/60 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100/60 text-gray-500 hover:text-gray-900"
                }`}
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pb-6">
              <p
                id="modal-description"
                className={`mb-6 leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Enter your email address below. We'll send you a download link
                to access your purchase.
              </p>

              <div className="mb-6">
                <label
                  htmlFor="email-input"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-800/80"
                      : "bg-white/60 border-gray-200/50 text-gray-900 placeholder-gray-500 hover:bg-white/80"
                  } ${
                    !isValidEmail ? "border-red-500 focus:ring-red-500/50" : ""
                  }`}
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-sm mt-2">
                    {email
                      ? "Please enter a valid email address"
                      : "Email address is required"}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white border border-gray-700/50"
                      : "bg-gray-100/60 hover:bg-gray-200/60 text-gray-700 hover:text-gray-900 border border-gray-200/50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  disabled={!email || !isValidEmail}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailModalComponent;
