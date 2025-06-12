"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Clock,
  Globe,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

const ContactUs = () => {
  const { isDarkMode: darkMode } = useThemeContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Get in touch via email",
      value: "hello@presetstore.com",
      action: "mailto:hello@presetstore.com",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Speak with our team",
      value: "+91 70120 48527",
      action: "tel:+917012048527",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Quick chat on WhatsApp",
      value: "Chat Now",
      action: "https://wa.me/917012048527",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: MapPin,
      title: "Location",
      subtitle: "Our headquarters",
      value: "Kanayannur, Kerala, IN",
      action: "#",
      gradient: "from-teal-500 to-blue-500",
    },
  ];

  const faqs = [
    {
      question: "How quickly will I receive my presets?",
      answer:
        "Digital downloads are available immediately after purchase. You'll receive an email with download links within minutes.",
    },
    {
      question: "What software do your presets work with?",
      answer:
        "Our presets are compatible with Lightroom, Photoshop, and most popular editing software. Each product page lists specific compatibility.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, we'll provide a full refund.",
    },
    {
      question: "Can I use presets for commercial work?",
      answer:
        "Yes! All our presets come with a commercial license, so you can use them for client work and commercial projects.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <br />
      <br />
      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Get In Touch
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight ">
              <span
                className={`block ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Let's Create
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent py-1">
                Together
              </span>
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto font-bold${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Have questions about our presets? Need custom work? Or just want
              to say hello? We'd love to hear from you and help bring your
              creative vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    method.action.startsWith("http")
                      ? "noopener noreferrer"
                      : ""
                  }
                  className={`group p-6 rounded-2xl backdrop-blur-sm border ${
                    darkMode
                      ? "bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50"
                      : "bg-white/70 border-white/50 hover:bg-white/90"
                  } hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                    darkMode
                      ? "hover:shadow-purple-500/10"
                      : "hover:shadow-purple-500/20"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${method.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {method.title}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {method.subtitle}
                  </p>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    } group-hover:text-blue-600 transition-colors`}
                  >
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div
                className={`p-8 rounded-3xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/50 border-white/50"
                }`}
              >
                <h2
                  className={`text-3xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Send Us a Message
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-colors ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-colors ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-colors ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-700 text-white focus:border-blue-500"
                            : "bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="custom">Custom Presets</option>
                        <option value="business">Business Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-colors ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-colors resize-none ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group w-full px-8 py-4 font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/50 border-white/50"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Business Hours
                  </h3>
                </div>
                <div
                  className={`space-y-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div
                    className={`text-xs pt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    *All times in IST (UTC+5:30)
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/50 border-white/50"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index}>
                      <h4
                        className={`text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/50 border-white/50"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Response Time
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  We typically respond to all inquiries within{" "}
                  <span className="font-semibold text-green-600">24 hours</span>
                  . For urgent matters, please use WhatsApp for faster response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
