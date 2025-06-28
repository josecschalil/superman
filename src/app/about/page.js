"use client";
import React from "react";
import {
  Camera,
  Award,
  Users,
  Heart,
  Zap,
  Target,
  Star,
  CheckCircle,
  Headphones,
  Music,
} from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

const AboutUs = () => {
  const { isDarkMode: darkMode } = useThemeContext();

  const stats = [
    { number: "25K+", label: "Happy Listeners", icon: Users },
    { number: "5+", label: "Curated Playlists", icon: Award },
    { number: "1M+", label: "Streams & Shares", icon: Headphones },
    { number: "50+", label: "Genres & Moods Covered", icon: Music },
  ];

  const values = [
    {
      icon: Target,
      title: "Curated Quality",
      description:
        "Every playlist is handpicked with precision, blending tracks that flow seamlessly to create the perfect vibe.",
    },
    {
      icon: Zap,
      title: "Fresh Sounds",
      description:
        "We stay ahead of the curve, updating playlists with trending tracks and hidden gems to keep your music fresh.",
    },
    {
      icon: Heart,
      title: "For the Soul",
      description:
        "Crafted with emotion and intention, our playlists connect deeply — whether you're working, driving, or unwinding.",
    },
    {
      icon: CheckCircle,
      title: "Always On Point",
      description:
        "Reliable mood-matching playlists that suit every moment, from focused study sessions to weekend getaways.",
    },
  ];

  const team = [
    {
      name: "Jose C S",
      role: "Creative Director",
      bio: "Professional photographer with 8+ years creating cinematic looks for brands worldwide.",
      image:
        "https://masterbundles.com/wp-content/uploads/2024/07/gangsta_rap_3d_avatar-1-772-490x490.jpg",
    },
    {
      name: "Jaseem K",
      role: "Color Grading Expert",
      bio: "Film industry veteran specializing in creating mood-driven color palettes for storytelling.",
      image:
        "https://masterbundles.com/wp-content/uploads/2024/07/gangsta_rap_3d_avatar-1-772-490x490.jpg",
    },
    {
      name: "Radih Myran",
      role: "Technical Lead",
      bio: "Ensuring every preset works flawlessly across all platforms and editing software.",
      image:
        "https://masterbundles.com/wp-content/uploads/2024/07/gangsta_rap_3d_avatar-1-772-490x490.jpg",
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
      <br />

      {/* Hero Section */}
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              About Our Story
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span
                className={`block ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Crafting Musical
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent py-1">
                Excellence
              </span>
            </h1>

            <p
              className={`text-lg leading-relaxed max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I don’t make playlists.I just craft experiences. Every song is
              handpicked with feeling, not just rhythm. I believe music can
              speak when words fall short. From late-night moods to sunlit
              drives, there’s a vibe for everything. Welcome to my world, one
              track at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-1 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
                    darkMode
                      ? "bg-gray-800/30 border-gray-700/30"
                      : "bg-white/70 border-white/50"
                  } hover:scale-105 transition-transform duration-300`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.number}
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className={`text-4xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our Journey Started With a Simple Idea
              </h2>

              <div
                className={`w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600`}
              ></div>

              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                After years of curating playlists late into the night, pouring
                emotions into every track, Aanya was just another unheard music
                lover with a passion no one noticed. She’d post snippets on
                Instagram — quiet reels, moody captions, and zero likes. Friends
                told her to give up, but she kept going, believing someone out
                there would feel what she felt. One rainy evening, she shared a
                reel titled *“For the ones who feel too much”* — a raw, honest
                collection of indie tracks that mirrored her soul.
              </p>

              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                It exploded overnight. Comments flooded in from strangers saying
                it felt like the soundtrack to their lives. From invisible to
                viral, Aanya’s playlist became a refuge for thousands — proof
                that sometimes, all it takes is one post to turn quiet passion
                into something unforgettable.
              </p>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 ${
                        darkMode ? "border-gray-800" : "border-white"
                      } bg-gradient-to-r from-blue-400 to-purple-400`}
                    ></div>
                  ))}
                </div>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Trusted by thousands of listeners in Kerala
                </span>
              </div>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div
                className={`rounded-2xl p-6 backdrop-blur-md border shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                  darkMode
                    ? "bg-gray-900/60 border-gray-700/40"
                    : "bg-white/60 border-gray-300/60"
                }`}
              >
                <div className="flex flex-col space-y-4">
                  {/* Album Art */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 animate-pulse"></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="space-y-2">
                    <h3
                      className={`text-lg font-bold truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      വരുവാനില്ലാരുമീ വിജനമാ..
                    </h3>
                    <p
                      className={`text-sm truncate ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Manichithrathazhu • Superman
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div
                      className={`flex justify-between text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span>1:32</span>
                      <span>4:00</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center space-x-4">
                      <button
                        className={`p-2 rounded-full transition-colors ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6z" />
                        </svg>
                      </button>

                      <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>

                      <button
                        className={`p-2 rounded-full transition-colors ${
                          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                      </button>
                    </div>

                    <button
                      className={`p-2 rounded-full transition-colors ${
                        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343a8 8 0 000 11.314"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-lg animate-pulse"></div>

              {/* Sound waves decoration */}
              <div className="absolute top-1/2 -left-8 flex flex-col space-y-1 opacity-30">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 150}ms`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Drives Us
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The principles that guide everything we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl backdrop-blur-sm border ${
                    darkMode
                      ? "bg-gray-800/20 border-gray-700/30"
                      : "bg-white/50 border-white/50"
                  } hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                    darkMode
                      ? "hover:shadow-purple-500/10"
                      : "hover:shadow-purple-500/20"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-3 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p
                        className={`leading-relaxed ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className={`p-12 rounded-3xl backdrop-blur-sm border ${
              darkMode
                ? "bg-gray-800/30 border-gray-700/30"
                : "bg-white/50 border-white/50"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Feel Every Beat?
            </h2>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands of music lovers discovering handpicked playlists
              made to match every mood, moment, and memory.
            </p>
            <button className="group px-8 py-4 font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
              Explore Our Playlists
              <Camera className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
