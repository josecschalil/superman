import React from "react";
import { Star, Download, Play, Heart, Share2 } from "lucide-react";

const CardGrid = ({ darkMode }) => {
  const cardData = [
    {
      id: 1,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Sunset Moods",
      description:
        "Warm, golden hour presets perfect for romantic portraits and dreamy landscapes",
      price: "$29",
      rating: 4.9,
      downloads: "12K+",
    },
    {
      id: 2,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Urban Cinematic",
      description:
        "Professional video LUTs for modern cityscape and street photography",
      price: "$39",
      rating: 4.8,
      downloads: "8.5K+",
    },
    {
      id: 3,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Nature Vibes",
      description:
        "Enhance your outdoor adventures with vibrant nature-focused presets",
      price: "$24",
      rating: 4.7,
      downloads: "15K+",
    },
    {
      id: 4,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Forest Dreams",
      description:
        "Mystical and moody presets for enchanting forest photography",
      price: "$34",
      rating: 4.9,
      downloads: "9K+",
    },
    {
      id: 5,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Ocean Breeze",
      description:
        "Fresh, clean presets that capture the essence of coastal living",
      price: "$19",
      rating: 4.6,
      downloads: "20K+",
    },
    {
      id: 6,
      image:
        "https://masterbundles.com/wp-content/uploads/2023/02/preview--379-1.jpg?w=400&h=400&fit=crop&crop=center",
      title: "Golden Hour",
      description: "Professional presets for that perfect golden hour glow",
      price: "$27",
      rating: 4.8,
      downloads: "18K+",
    },
  ];

  return (
    <section
      className={`py-8 sm:py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-white"
      }`}
    >
      <br /> <br /> <br />
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              Our Premium
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6"></div>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover our handcrafted presets and LUTs designed by professional
            photographers and filmmakers
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {cardData.map((card) => {
            return (
              <div
                key={card.id}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl border backdrop-blur-lg aspect-square w-full ${
                  darkMode
                    ? "bg-gray-800/20 border-gray-700/20 hover:bg-gray-800/30"
                    : "bg-white/60 border-white/30 hover:bg-white/80"
                }`}
              >
                {/* Image Section */}
                <div className="relative h-3/5 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Top Actions */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                      {card.price}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="h-2/5 p-3 sm:p-4 lg:p-6 flex flex-col justify-between">
                  {/* Title and Description */}
                  <div className="mb-2 sm:mb-4">
                    <h3
                      className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1 ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
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
                          className={`text-xs sm:text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {card.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {card.downloads}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-tr from-blue-600/5 to-purple-600/5"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-16 px-2">
          <button className="group px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
            View All Presets
            <Download className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
