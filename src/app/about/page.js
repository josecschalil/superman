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
} from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

const AboutUs = () => {
  const { isDarkMode: darkMode } = useThemeContext();

  const stats = [
    { number: "10K+", label: "Happy Creators", icon: Users },
    { number: "500+", label: "Premium Presets", icon: Camera },
    { number: "50+", label: "LUT Collections", icon: Award },
    { number: "99%", label: "Satisfaction Rate", icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "Every preset is meticulously crafted and tested to ensure professional-grade results that elevate your creative work.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We stay ahead of trends, constantly developing new styles and techniques to keep your content fresh and engaging.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Building a supportive community of creators who inspire each other to push creative boundaries and grow together.",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description:
        "Consistent, high-quality presets that work seamlessly across different lighting conditions and subjects.",
    },
  ];

  const team = [
    {
      name: "Jose C S",
      role: "Creative Director",
      bio: "Professional photographer with 8+ years creating cinematic looks for brands worldwide.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Jaseem K",
      role: "Color Grading Expert",
      bio: "Film industry veteran specializing in creating mood-driven color palettes for storytelling.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Radih Myran",
      role: "Technical Lead",
      bio: "Ensuring every preset works flawlessly across all platforms and editing software.",
      gradient: "from-teal-500 to-blue-500",
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

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span
                className={`block ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Crafting Visual
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent py-1">
                Excellence
              </span>
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We're passionate creators dedicated to helping photographers and
              videographers transform their vision into stunning reality through
              premium presets and LUTs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
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
      <section className="py-20">
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
                What began as a personal quest to perfect our own photography
                quickly evolved into something bigger. We realized that many
                creators were struggling with the same challenges— spending
                hours trying to achieve that perfect look, only to feel
                frustrated with inconsistent results.
              </p>

              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                That's when we decided to share our carefully crafted presets
                and LUTs with the world. Each preset is born from real shooting
                scenarios, tested across various conditions, and refined until
                it delivers that professional magic every single time.
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
                  Trusted by thousands of creators worldwide
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className={`rounded-3xl p-8 backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/30 border-white/50"
                }`}
              >
                <div className="space-y-4">
                  <div
                    className={`h-4 rounded animate-pulse ${
                      darkMode
                        ? "bg-gradient-to-r from-blue-800 to-purple-800"
                        : "bg-gradient-to-r from-blue-200 to-purple-200"
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded animate-pulse delay-75 w-3/4 ${
                      darkMode
                        ? "bg-gradient-to-r from-purple-800 to-teal-800"
                        : "bg-gradient-to-r from-purple-200 to-teal-200"
                    }`}
                  ></div>
                  <div
                    className={`h-32 rounded-xl animate-pulse delay-150 ${
                      darkMode
                        ? "bg-gradient-to-br from-gray-700 to-gray-800"
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}
                  ></div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-8 rounded animate-pulse ${
                          darkMode
                            ? "bg-gradient-to-r from-teal-800 to-blue-800"
                            : "bg-gradient-to-r from-teal-200 to-blue-200"
                        }`}
                        style={{ animationDelay: `${i * 75}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg animate-pulse rotate-12"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-red-500 shadow-lg animate-pulse -rotate-12"></div>
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

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Meet the Creative Minds
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The passionate team behind every preset
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/30"
                    : "bg-white/50 border-white/50"
                } hover:scale-105 transition-all duration-300`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${member.gradient} mx-auto mb-6 flex items-center justify-center`}
                >
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm"></div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {member.name}
                </h3>
                <div className="text-blue-600 font-medium mb-4">
                  {member.role}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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
              Ready to Transform Your Creative Work?
            </h2>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands of creators who've elevated their photography and
              videography with our premium presets.
            </p>
            <button className="group px-8 py-4 font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
              Explore Our Presets
              <Camera className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
