"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Star,
  Camera,
  Download,
  CreditCard,
  Shield,
  Zap,
  Users,
  MessageCircle,
} from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
const FAQ = () => {
  const { isDarkMode: darkMode } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: HelpCircle,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "presets",
      name: "Presets & LUTs",
      icon: Camera,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "download",
      name: "Downloads",
      icon: Download,
      color: "from-green-500 to-teal-500",
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: CreditCard,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "support",
      name: "Technical Support",
      icon: Zap,
      color: "from-teal-500 to-blue-500",
    },
    {
      id: "licensing",
      name: "Licensing",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const faqData = [
    {
      category: "presets",
      question: "What editing software do your presets work with?",
      answer:
        "Our presets are primarily designed for Adobe Lightroom (both Classic and CC versions). We also offer Photoshop actions and Capture One styles for selected collections. Each product page clearly indicates compatibility. Most of our LUTs work with popular video editing software like Premiere Pro, Final Cut Pro, and DaVinci Resolve.",
    },
    {
      category: "presets",
      question: "How do I install presets in Lightroom?",
      answer:
        'Installation is simple! After downloading, open Lightroom and go to the Develop module. In the Presets panel, right-click and select "Import Presets." Navigate to your downloaded .lrtemplate or .xmp files and select them. The presets will appear in a new folder in your presets panel. We include detailed installation guides with every purchase.',
    },
    {
      category: "presets",
      question: "Can I adjust the presets after applying them?",
      answer:
        "Absolutely! Our presets are designed as starting points for your creativity. After applying a preset, you can adjust any setting including exposure, contrast, highlights, shadows, and color grading. This flexibility allows you to customize the look to match your specific image and style preferences.",
    },
    {
      category: "presets",
      question: "Do presets work on RAW and JPEG files?",
      answer:
        "Yes, our presets work on both RAW and JPEG files. However, RAW files provide much better results due to their greater dynamic range and color information. RAW files allow for more dramatic adjustments without quality loss, while JPEG files have more limitations in post-processing flexibility.",
    },
    {
      category: "presets",
      question: "What's the difference between presets and LUTs?",
      answer:
        "Presets are primarily for photo editing in software like Lightroom and contain various adjustment settings. LUTs (Look-Up Tables) are color grading tools mainly used in video editing and can also work with photos. LUTs focus specifically on color transformation, while presets can include exposure, contrast, and other photographic adjustments.",
    },
    {
      category: "download",
      question: "How quickly can I download my presets after purchase?",
      answer:
        "Downloads are available immediately after successful payment! You'll receive an email with download links within 2-3 minutes of purchase completion. The email includes direct download links and detailed installation instructions. If you don't receive the email, check your spam folder or contact our support team.",
    },
    {
      category: "download",
      question: "How long are download links valid?",
      answer:
        "Your download links remain active for 30 days from the date of purchase, with unlimited downloads during this period. We recommend downloading and backing up your files immediately. If your links expire, contact our support team with your order number, and we'll provide fresh download links at no charge.",
    },
    {
      category: "download",
      question: "What file formats do you provide?",
      answer:
        "We provide multiple formats for maximum compatibility: .lrtemplate files for older Lightroom versions, .xmp files for newer versions, and .cube files for LUTs. Each download includes installation guides and preview images. Video presets come in various formats including .cube, .3dl, and software-specific formats.",
    },
    {
      category: "download",
      question: "Can I re-download my presets if I lose them?",
      answer:
        "Yes! Keep your order confirmation email with the download links, as they remain valid for 30 days. After that period, contact our support team with your order number and email address. We maintain purchase records and can provide fresh download links for all your past purchases.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Google Pay, Apple Pay, and various local payment methods depending on your region. All transactions are processed securely through industry-standard encryption. You'll receive an invoice via email after each purchase.",
    },
    {
      category: "payment",
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day satisfaction guarantee on all purchases. If you're not completely happy with your presets, contact us within 30 days for a full refund. Please note that due to the digital nature of our products, we may ask for feedback to help us improve our offerings.",
    },
    {
      category: "payment",
      question: "Are there any subscription fees?",
      answer:
        "No, all our presets are one-time purchases with no recurring fees. Once you buy a preset pack, it's yours forever. You can use the presets on unlimited personal projects without any additional costs. We occasionally offer bundle deals and seasonal discounts for even better value.",
    },
    {
      category: "payment",
      question: "Can I purchase presets as a gift?",
      answer:
        "Absolutely! During checkout, you can specify a different email address for delivery, or forward the download links to your recipient. We also offer digital gift cards that allow recipients to choose their own presets. Contact us if you need a custom gift certificate or special presentation.",
    },
    {
      category: "support",
      question: "Why don't presets look the same on my photos?",
      answer:
        "This is completely normal! Presets are designed to work across various lighting conditions and subjects, but every photo is unique. Factors like original lighting, white balance, exposure, and subject matter affect the final result. Always feel free to adjust the preset settings to match your specific image perfectly.",
    },
    {
      category: "support",
      question: "My presets aren't showing up in Lightroom. What should I do?",
      answer:
        "First, ensure you've imported the presets correctly into the Develop module. Try restarting Lightroom after installation. Check that you're using the correct file format for your Lightroom version. If issues persist, our support team can provide detailed troubleshooting steps and even schedule a quick screen-share session to help.",
    },
    {
      category: "support",
      question:
        "Can you help me choose the right presets for my photography style?",
      answer:
        "Of course! We love helping photographers find their perfect style. Contact us with some sample images and a description of your preferred aesthetic. Our team can recommend specific preset collections that match your vision. We also offer preview galleries and before/after examples for every preset pack.",
    },
    {
      category: "support",
      question: "Do you offer tutorials on how to use presets effectively?",
      answer:
        "Yes! We provide comprehensive tutorials including installation guides, usage tips, and creative techniques. Our blog features regular articles on preset application, photo editing workflows, and style development. We also share video tutorials on our social media channels and offer one-on-one consultation sessions.",
    },
    {
      category: "licensing",
      question: "Can I use presets for commercial photography?",
      answer:
        "Yes! All our presets come with a commercial license included in the purchase price. You can use them for client work, stock photography, social media marketing, and any commercial projects. The license covers unlimited usage for your business without additional fees or royalties.",
    },
    {
      category: "licensing",
      question: "Can I share presets with my team or other photographers?",
      answer:
        "Our standard license covers individual use. For teams or studios, we offer special multi-user licenses at discounted rates. Contact us with details about your team size and usage requirements. We can create a custom licensing agreement that meets your needs while respecting our creators' work.",
    },
    {
      category: "licensing",
      question: "Am I allowed to modify and resell your presets?",
      answer:
        "No, our license doesn't permit redistribution or resale of the presets, even if modified. You can certainly adjust them for your own use and use them in your commercial work, but the presets themselves cannot be shared, sold, or distributed. This protects both our creators and maintains the value of original work.",
    },
    {
      category: "licensing",
      question: "What happens to my license if I upgrade my editing software?",
      answer:
        "Your license remains valid regardless of software upgrades! If you upgrade to a newer version of Lightroom or switch to compatible software, you can continue using your presets. We often provide updated file formats for major software updates, and existing customers receive these updates free of charge.",
    },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Help Center
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span
                className={`block py-2${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Frequently Asked
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent pt-4">
                Questions
              </span>
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto font-bold${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Find quick answers to common questions about our presets,
              downloads, licensing, and more. Can't find what you're looking
              for? Our support team is here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-6 py-4 rounded-2xl border backdrop-blur-sm transition-colors text-lg ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                      : darkMode
                      ? "bg-gray-800/30 text-gray-300 hover:bg-gray-800/50 border border-gray-700/30"
                      : "bg-white/70 text-gray-700 hover:bg-white/90 border border-white/50"
                  }`}
                >
                  <IconComponent className="w-3 h-3 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {filteredFAQs.length === 0 ? (
            <div
              className={`text-center py-12 p-8 rounded-2xl backdrop-blur-sm border ${
                darkMode
                  ? "bg-gray-800/20 border-gray-700/30"
                  : "bg-white/50 border-white/50"
              }`}
            >
              <HelpCircle
                className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <h3
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                No results found
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Try adjusting your search terms or browse different categories
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openItems[index];
                return (
                  <div
                    key={index}
                    className={`rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800/20 border-gray-700/30"
                        : "bg-white/50 border-white/50"
                    } ${isOpen ? "shadow-xl" : "hover:shadow-lg"}`}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors"
                    >
                      <h3
                        className={`text-md font-semibold pr-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isOpen
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-200 text-gray-600"
                        } transition-all duration-300`}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div
                          className={`w-full h-px mb-4 ${
                            darkMode ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        ></div>
                        <p
                          className={`leading-relaxed ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`text-center p-12 rounded-3xl backdrop-blur-sm border ${
              darkMode
                ? "bg-gray-800/30 border-gray-700/30"
                : "bg-white/50 border-white/50"
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6">
              <MessageCircle className="w-8 h-8" />
            </div>

            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Still Have Questions?
            </h2>

            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our support team is here to help! Get personalized assistance with
              your presets, technical issues, or any other questions you might
              have.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Contact Support
                <MessageCircle className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>

              <button
                onClick={() =>
                  window.open("https://wa.me/917012048527", "_blank")
                }
                className={`px-8 py-4 font-semibold rounded-2xl border transition-all duration-300 ${
                  darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                    : "border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400"
                } hover:scale-105`}
              >
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
