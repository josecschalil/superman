"use client";
import React, { useState, useEffect } from "react";
import { Star, Download, Play, Heart, Share2 } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { useRouter } from "next/navigation";

const CardGrid = ({}) => {
  const { isDarkMode: darkMode } = useThemeContext();
  const [presets, setPresets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/preset-packs/");
        if (!response.ok) {
          throw new Error("Failed to fetch presets");
        }
        const data = await response.json();
        setPresets(data);
      } catch (error) {
        console.error("Failed to fetch presets", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform API data to match card component's expected format
  const transformedPresets = presets.map((preset) => ({
    id: preset.id,
    image:
      preset.thumbnailLink ||
      "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
    title: preset.title,
    subtitle: preset.subtitle,
    description: preset.description || "No description available",
    price: preset.price,
    discountedPrice: preset.discountedPrice,
    rating: 4.5, // Default value
    downloads: "1K+", // Default value
    createdAt: preset.createdAt,
  }));
  const shareButtonClick = (productId) => {
    const shareUrl = `${window.location.origin}/explore/${productId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Shareable link copied to clipboard!");
    });
  };
  const handleCardClick = (productId) => {
    router.push(`explore/${productId}`);
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="text-center py-8 text-red-500">
          Error loading presets: {error}
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-8 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-white"
      }`}
    >
      <br />
      <br />

      <br />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 transition-colors duration-300">
            <span
              className={`transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Our Playlist
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent py-1">
              Collection
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6"></div>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover playlists thoughtfully curated by music lovers and experts
            to match every mood and moment.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {transformedPresets.map((card) => (
            <div
              onClick={() => handleCardClick(card.id)}
              key={card.id}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border backdrop-blur-lg aspect-square w-full ${
                darkMode
                  ? "bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/40 shadow-gray-900/20"
                  : "bg-white/70 border-white/40 hover:bg-white/90 shadow-gray-900/10"
              }`}
            >
              {/* Image Section */}
              <div className="relative h-3/5 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://drive.usercontent.google.com/download?id=1RiAfiDzk1UuIHue4oVddeauAXguDumG-&export=view";
                  }}
                />

                {/* Image Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    darkMode
                      ? "bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                ></div>

                {/* Top Actions */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 hover:text-red-500" />
                  </button>
                  <button
                    className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
                    onClick={() => shareButtonClick(card.id)}
                  >
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  </button>
                </div>

                {/* Price Tag */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-2">
                  {card.discountedPrice && card.discountedPrice < card.price ? (
                    <>
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                        ₹ {card.discountedPrice}
                      </span>
                      <span className="line-through text-md text-gray-100">
                        ₹{card.price}
                      </span>
                    </>
                  ) : (
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                      ₹{card.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="h-2/5 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
                {/* Title and Description */}
                <div className="mb-2 sm:mb-4">
                  <h3
                    className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1 transition-colors duration-300 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed line-clamp-2 transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  {/* Stats */}
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span
                        className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {card.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {card.downloads}
                      </span>
                    </div>
                  </div>

                  {/* Preview Button */}
                  <button
                    className="p-1.5 sm:p-2 rounded-full bg-blue-600/10 hover:bg-blue-600/20 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add preview functionality here
                    }}
                  >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  darkMode
                    ? "bg-gradient-to-tr from-blue-600/10 to-purple-600/10"
                    : "bg-gradient-to-tr from-blue-600/5 to-purple-600/5"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-16 px-2">
          <button
            className="group px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            onClick={() => {
              // Add view all functionality
            }}
          >
            View All Playlists
            <Download className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
