"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  Eye,
  Users,
  Award,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useThemeContext } from "@/app/context/ThemeContext";
import EmailModalComponent from "@/app/components/EmailModal";

const ProductDetailPage = ({ params }) => {
  // State for UI interactions
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("pro");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isDarkMode } = useThemeContext();
  const [presets, setPresets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();

  const handleExplore = () => {
    router.push("/explore");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/preset-packs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch presets");
        }
        console.log("Response status:", response.status);
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

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
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
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="text-center py-8 text-red-500">
          Error loading presets: {error}
        </div>
      </div>
    );
  }
  // Static product data
  console.log("Presets data:", presets);
  const product = {
    preset: presets.id,
    name: presets.title || "Aurora Preset Collection",
    subtitle: presets.subtitle || "Transform Your Photos with Stunning Presets",
    price: presets.discountedPrice || 49.99,
    originalPrice: presets.price || 79.99,
    rating: 4.9,
    reviewCount: 2847,
    downloads: "15.2k",
    images: [
      presets.imageLink1 ||
        "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=800&auto=format&fit=crop",
      presets.imageLink2 ||
        "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=800&auto=format&fit=crop",
      presets.imageLink3 ||
        "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=800&auto=format&fit=crop",
      presets.imageLink4 ||
        "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=800&auto=format&fit=crop",
    ],
    variants: [
      {
        id: "starter",
        name: "Starter",
        price: 29.99,
        description: "25 Essential Presets",
        popular: false,
        savings: 25,
      },
      {
        id: "pro",
        name: "Pro Collection",
        price: 49.99,
        description: "75 Premium Presets + Mobile Pack",
        popular: true,
        savings: 40,
      },
      {
        id: "ultimate",
        name: "Ultimate Bundle",
        price: 89.99,
        description: "150 Presets + Tutorials + Overlays",
        popular: false,
        savings: 55,
      },
    ],
    features: [
      {
        icon: Download,
        text: "Instant Download",
        desc: "Get access immediately",
      },
      {
        icon: Sparkles,
        text: "AI-Enhanced",
        desc: "Machine learning optimized",
      },
      {
        icon: Eye,
        text: "Mobile Compatible",
        desc: "Works on phones & tablets",
      },
      { icon: Users, text: "Commercial License", desc: "Use for client work" },
      {
        icon: Award,
        text: "Award Winning",
        desc: "Top rated by professionals",
      },
      {
        icon: Zap,
        text: "One-Click Magic",
        desc: "Transform photos instantly",
      },
    ],
    stats: [
      { label: "Downloads", value: "15.2k", icon: Download },
      { label: "Rating", value: "4.9★", icon: Star },
      { label: "Users", value: "8.7k", icon: Users },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Alexandra Chen",
      title: "Professional Photographer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      date: "2 days ago",
      review:
        "These presets are absolutely revolutionary! The Aurora collection transformed my entire portfolio.",
      helpful: 89,
      images: [
        "https://images.unsplash.com/photo-1682686580391-615b3f4f56d7?q=80&w=120&auto=format&fit=crop",
      ],
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "5 days ago",
      review:
        "Mind-blowing quality! My Instagram engagement increased by 300% after using these presets.",
      helpful: 156,
      verified: true,
    },
  ];

  // Helper functions
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const selectedVariantData = product.variants.find(
    (v) => v.id === selectedVariant
  );

  const getThemeClasses = () => {
    if (isDarkMode) {
      return {
        bg: "bg-gray-900",
        cardBg: "bg-gray-800 border-gray-700",
        text: "text-white",
        textSecondary: "text-gray-300",
        textMuted: "text-gray-400",
        button: "bg-blue-600 hover:bg-blue-700",
        buttonSecondary: "border-gray-600 text-gray-300 hover:bg-gray-700",
        accent: "text-blue-400",
        hoverBg: "hover:bg-gray-700",
        badgeLight: "bg-blue-900 text-blue-300",
      };
    } else {
      return {
        bg: "bg-gray-50",
        cardBg: "bg-white border-gray-200",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        textMuted: "text-gray-500",
        button: "bg-blue-600 hover:bg-blue-700",
        buttonSecondary: "border-gray-300 text-gray-700 hover:bg-gray-50",
        accent: "text-blue-600",
        hoverBg: "hover:bg-gray-50",
        badgeLight: "bg-blue-50 text-blue-800",
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.bg}`}
    >
      <br />
      <br />
      <br />
      <br />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Mobile-first header section */}
        <div className="lg:hidden space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                isDarkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              Trending
            </span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                isDarkMode
                  ? "bg-green-900 text-green-300"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Best Seller
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-4xl font-bold ${themeClasses.text} leading-tight`}
          >
            {product.name}
          </h1>
          <p className={`text-lg ${themeClasses.textSecondary}`}>
            {product.subtitle}
          </p>
        </div>

        {/* Mobile Image Gallery - Show first on mobile */}
        <div className="lg:hidden space-y-6 mb-8">
          <div className="relative group">
            <div
              className={`relative aspect-square overflow-hidden rounded-2xl border ${themeClasses.cardBg}`}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={`${product.name} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <button
                onClick={prevImage}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl ${themeClasses.cardBg} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
              >
                <ChevronLeft className={`w-5 h-5 ${themeClasses.text}`} />
              </button>
              <button
                onClick={nextImage}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl ${themeClasses.cardBg} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
              >
                <ChevronRight className={`w-5 h-5 ${themeClasses.text}`} />
              </button>

              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl ${themeClasses.cardBg}`}
              >
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeImageIndex
                        ? "bg-blue-600 w-6 h-2"
                        : "bg-gray-400 hover:bg-gray-300 w-2 h-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Thumbnail gallery */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  index === activeImageIndex
                    ? "border-blue-600 scale-[1.02]"
                    : "border-gray-300 hover:scale-[1.02] opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Mobile Stats */}
          <div
            className={`grid grid-cols-3 gap-4 p-6 rounded-2xl border ${themeClasses.cardBg}`}
          >
            {product.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon
                  className={`w-6 h-6 mx-auto mb-2 ${themeClasses.accent}`}
                />
                <div className={`text-xl font-bold ${themeClasses.text}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Desktop Image Gallery */}
          <div className="hidden lg:block order-2 lg:order-1 space-y-6">
            <div className="relative group">
              <div
                className={`relative aspect-square overflow-hidden rounded-2xl border ${themeClasses.cardBg}`}
              >
                <img
                  src={product.images[activeImageIndex]}
                  alt={`${product.name} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <button
                  onClick={prevImage}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl ${themeClasses.cardBg} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
                >
                  <ChevronLeft className={`w-5 h-5 ${themeClasses.text}`} />
                </button>
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl ${themeClasses.cardBg} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
                >
                  <ChevronRight className={`w-5 h-5 ${themeClasses.text}`} />
                </button>

                <div
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl ${themeClasses.cardBg}`}
                >
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeImageIndex
                          ? "bg-blue-600 w-6 h-2"
                          : "bg-gray-400 hover:bg-gray-300 w-2 h-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    index === activeImageIndex
                      ? "border-blue-600 scale-[1.02]"
                      : "border-gray-300 hover:scale-[1.02] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Desktop Stats */}
            <div
              className={`grid grid-cols-3 gap-4 p-6 rounded-2xl border ${themeClasses.cardBg}`}
            >
              {product.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon
                    className={`w-6 h-6 mx-auto mb-2 ${themeClasses.accent}`}
                  />
                  <div className={`text-xl font-bold ${themeClasses.text}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${themeClasses.textMuted}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Hide these elements on mobile since we moved them above */}
            <div className="hidden lg:block space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isDarkMode
                      ? "bg-blue-900 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Trending
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isDarkMode
                      ? "bg-green-900 text-green-300"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  Best Seller
                </span>
              </div>

              <h1
                className={`text-4xl sm:text-4xl font-bold ${themeClasses.text} leading-tight`}
              >
                {product.name}
              </h1>
              <p className={`text-lg ${themeClasses.textSecondary}`}>
                {product.subtitle}
              </p>
            </div>

            {/* Rating */}
            <div
              className={`flex items-center gap-5 p-3 rounded-xl border ${themeClasses.cardBg}`}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-lg font-bold ${themeClasses.text}`}>
                  {product.rating}
                </span>
              </div>
              <div className={`text-sm ${themeClasses.textMuted}`}>
                {product.reviewCount.toLocaleString()} reviews •{" "}
                {product.downloads} downloads
              </div>
            </div>

            {/* Pricing */}
            <div className={`p-6 rounded-2xl border ${themeClasses.cardBg}`}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-3xl font-bold ${themeClasses.text}`}>
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span
                    className={`text-lg line-through ${themeClasses.textMuted}`}
                  >
                    ${product.originalPrice}
                  </span>
                )}
                <span className="px-3 py-1 text-sm bg-green-600 text-white font-bold rounded-lg">
                  -
                  {(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="space-y-4 mx-auto my-7">
                <p
                  className={`text-md md:text-md leading-relaxed max-w-xl ${
                    isDarkMode ? "text-gray-300" : ""
                  }`}
                >
                  {presets.description ||
                    "This preset collection includes a variety of styles to enhance your photography, from vibrant landscapes to moody portraits. Perfect for both beginners and professionals."}
                </p>
              </div>

              {/* Buy Buttons */}
              <div className="space-y-3 px-3">
                <EmailModalComponent
                  price={product.price}
                  preset={product.preset}
                />

                <button
                  onClick={handleExplore}
                  className={`w-full px-6 py-4 border-2 font-semibold rounded-xl transition-all duration-300 ${themeClasses.buttonSecondary}`}
                >
                  Explore More
                </button>
              </div>
            </div>

            {/* Features */}
            <div className={`p-6 rounded-2xl border ${themeClasses.cardBg}`}>
              <h3 className={`text-xl font-semibold mb-6 ${themeClasses.text}`}>
                What's Included:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isDarkMode ? "bg-blue-900" : "bg-blue-100"
                      }`}
                    >
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className={`font-semibold ${themeClasses.text}`}>
                        {feature.text}
                      </div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${themeClasses.text}`}>
              What Creators Are Saying
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary}`}>
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`p-6 rounded-2xl border ${themeClasses.cardBg}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 p-1 bg-green-500 rounded-full">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className={`font-semibold ${themeClasses.text}`}>
                          {review.name}
                        </h4>
                        <p className={`text-sm ${themeClasses.accent}`}>
                          {review.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-sm ${themeClasses.textMuted}`}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  className={`leading-relaxed mb-4 ${themeClasses.textSecondary}`}
                >
                  "{review.review}"
                </p>

                <div className="flex items-center justify-between text-sm">
                  <button
                    className={`flex items-center gap-1 font-medium hover:text-blue-600 transition-colors ${themeClasses.textMuted}`}
                  >
                    <Heart className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Check className="w-4 h-4" />
                      Verified Purchase
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
