"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Star,
  Music,
  PlayCircle,
  User,
  Shield,
  LifeBuoy,
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
      id: "playlists",
      name: "Playlists",
      icon: Music,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "spotify",
      name: "Spotify",
      icon: PlayCircle,
      color: "from-green-500 to-teal-500",
    },
    {
      id: "account",
      name: "Account",
      icon: User,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "support",
      name: "Support",
      icon: LifeBuoy,
      color: "from-teal-500 to-blue-500",
    },
    {
      id: "collab",
      name: "Collaboration",
      icon: Users,
      color: "from-pink-500 to-yellow-500",
    },
  ];

  const faqData = [
    {
      category: "playlists",
      question: "What kind of playlists do you offer?",
      answer:
        "We curate Spotify playlists across moods and genres — from chill lo-fi beats to high-energy workout mixes, romantic evenings, and deep focus sessions.",
    },
    {
      category: "playlists",
      question: "How often are your playlists updated?",
      answer:
        "Our playlists are refreshed regularly, with new tracks added weekly or biweekly to keep the vibe fresh and relevant.",
    },
    {
      category: "playlists",
      question: "Can I request a custom playlist?",
      answer:
        "Yes! We love creating personalized playlists. Reach out through our contact form or Instagram with your mood or occasion, and we'll curate something special.",
    },
    {
      category: "playlists",
      question: "Where can I listen to the playlists?",
      answer:
        "All playlists are hosted on Spotify. Each collection on our site includes a direct link that opens in the Spotify app or web player.",
    },
    {
      category: "spotify",
      question: "Do I need a Spotify Premium account?",
      answer:
        "No, you can listen with a free Spotify account. However, Premium users enjoy ad-free listening, better sound quality, and offline access.",
    },
    {
      category: "spotify",
      question: "Can I save the playlists to my own Spotify account?",
      answer:
        "Absolutely! Just click the 'heart' icon or 'Save to Library' on Spotify to keep any playlist in your account for quick access.",
    },
    {
      category: "support",
      question: "The playlist link isn’t working. What should I do?",
      answer:
        "Try opening the link in the Spotify app or web player. If it still doesn't work, contact us and we'll send you a fresh link.",
    },
    {
      category: "support",
      question: "Can I suggest songs or themes for future playlists?",
      answer:
        "Definitely! We welcome your suggestions. Send them through our contact form or DM us — your favorite tracks might be featured next!",
    },
    {
      category: "content",
      question:
        "Can I use your playlists for public or commercial use (e.g., in a café)?",
      answer:
        "Our playlists are for personal enjoyment only. Spotify’s terms prohibit public or commercial playback without a commercial license from them.",
    },
    {
      category: "content",
      question: "Can I download the songs from your playlists?",
      answer:
        "No — downloading songs from our playlists is not possible through our site. Spotify handles all playback and licensing directly.",
    },
    {
      category: "account",
      question: "Do I need an account on your website to access the playlists?",
      answer:
        "No account is needed! Just browse our collections and click to listen on Spotify. It’s quick and completely free.",
    },
    {
      category: "collaboration",
      question: "Do you collaborate with curators or independent artists?",
      answer:
        "Yes! If you’re a curator, artist, or producer and want to collaborate or get featured, feel free to reach out. We're all about community and discovery.",
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
  const router = useRouter();
  const handleContact = () => {
    router.push("/support");
  };

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
              Find quick answers to common questions about our playlists,
              Spotify access, account help, and more. Can’t find what you’re
              looking for? Our support team is just a message away!
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
              <button
                onClick={handleContact}
                className="group px-8 py-4 font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
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
