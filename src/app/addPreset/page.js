"use client";
import React, { useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  Upload,
  Image,
  DollarSign,
  Link,
  Tag,
  FileText,
  Eye,
  Save,
} from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

const PresetFormPage = () => {
  const { user } = useAuth();
  const { darkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageLink1: "",
    imageLink2: "",
    imageLink3: "",
    imageLink4: "",
    price: "",
    discountedPrice: "",
    downloadLink: "",
    thumbnailLink: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.thumbnailLink.trim())
      newErrors.thumbnailLink = "Thumbnail link is required";
    if (!formData.downloadLink.trim())
      newErrors.downloadLink = "Download link is required";

    // Validate at least one image link
    const imageLinks = [
      formData.imageLink1,
      formData.imageLink2,
      formData.imageLink3,
      formData.imageLink4,
    ];
    const hasImageLink = imageLinks.some((link) => link.trim());
    if (!hasImageLink) {
      newErrors.imageLinks = "At least one image link is required";
    }

    // Validate price format
    if (formData.price && isNaN(formData.price)) {
      newErrors.price = "Price must be a valid number";
    }
    if (formData.discountedPrice && isNaN(formData.discountedPrice)) {
      newErrors.discountedPrice = "Discounted price must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/preset-packs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save preset pack");
      }

      const result = await response.json();
      console.log("Preset pack saved:", result);

      // Success feedback
      alert("Preset pack saved successfully!");

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        imageLink1: "",
        imageLink2: "",
        imageLink3: "",
        imageLink4: "",
        price: "",
        discountedPrice: "",
        downloadLink: "",
        thumbnailLink: "",
      });
    } catch (error) {
      console.error("Error saving preset pack:", error);
      alert("Error saving preset pack: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  if (user) {
    return (
      <div
        className={`min-h-screen pt-35 pb-20 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span
                className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}
              >
                Create New
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                Preset Pack
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Fill in the details for your new preset pack and make it available
              for download
            </p>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Main Content Card */}
            <div
              className={`rounded-3xl p-8 shadow-2xl border backdrop-blur-lg ${
                darkMode
                  ? "bg-gray-800/20 border-gray-700/30"
                  : "bg-white/40 border-white/50"
              }`}
            >
              {/* Basic Information */}
              <div className="space-y-6 mb-8">
                <h2
                  className={`text-2xl font-bold flex items-center gap-3 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <FileText className="w-6 h-6 text-purple-600" />
                  Basic Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Pack Title"
                    field="title"
                    placeholder="Enter preset pack title"
                    icon={Tag}
                    required
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                  <InputField
                    label="Subtitle"
                    field="subtitle"
                    placeholder="Enter pack subtitle"
                    icon={Tag}
                    required
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                </div>

                <InputField
                  label="Description"
                  field="description"
                  placeholder="Describe your preset pack in detail..."
                  icon={FileText}
                  multiline
                  required
                  formData={formData}
                  errors={errors}
                  darkMode={darkMode}
                  handleInputChange={handleInputChange}
                />
              </div>

              {/* Images Section */}
              <div className="space-y-6 mb-8">
                <h2
                  className={`text-2xl font-bold flex items-center gap-3 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <Image className="w-6 h-6 text-purple-600" />
                  Images
                </h2>

                {errors.imageLinks && (
                  <p className="text-red-500 text-sm">{errors.imageLinks}</p>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Image Link 1"
                    field="imageLink1"
                    placeholder="https://example.com/image1.jpg"
                    icon={Link}
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                  <InputField
                    label="Image Link 2"
                    field="imageLink2"
                    placeholder="https://example.com/image2.jpg"
                    icon={Link}
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                  <InputField
                    label="Image Link 3"
                    field="imageLink3"
                    placeholder="https://example.com/image3.jpg"
                    icon={Link}
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                  <InputField
                    label="Image Link 4"
                    field="imageLink4"
                    placeholder="https://example.com/image4.jpg"
                    icon={Link}
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                </div>

                <InputField
                  label="Thumbnail Image"
                  field="thumbnailLink"
                  placeholder="https://example.com/thumbnail.jpg"
                  icon={Eye}
                  required
                  formData={formData}
                  errors={errors}
                  darkMode={darkMode}
                  handleInputChange={handleInputChange}
                />
              </div>

              {/* Pricing & Links */}
              <div className="space-y-6">
                <h2
                  className={`text-2xl font-bold flex items-center gap-3 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  <DollarSign className="w-6 h-6 text-purple-600" />
                  Pricing & Download
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Price"
                    field="price"
                    type="number"
                    placeholder="99.00"
                    icon={DollarSign}
                    required
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                  <InputField
                    label="Discounted Price"
                    field="discountedPrice"
                    type="number"
                    placeholder="79.00 (optional)"
                    icon={DollarSign}
                    formData={formData}
                    errors={errors}
                    darkMode={darkMode}
                    handleInputChange={handleInputChange}
                  />
                </div>

                <InputField
                  label="Download Link"
                  field="downloadLink"
                  placeholder="https://drive.google.com/file/d/..."
                  icon={Upload}
                  required
                  formData={formData}
                  errors={errors}
                  darkMode={darkMode}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`group px-12 py-4 font-bold text-lg rounded-2xl flex items-center gap-3 
                bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                hover:shadow-2xl hover:shadow-purple-500/25 
                transform hover:scale-105 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Save Preset Pack
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Floating Elements for Visual Appeal - Hidden on mobile */}
          <div
            className={`hidden lg:block fixed top-32 right-8 w-16 h-16 rounded-2xl shadow-lg animate-pulse rotate-12 pointer-events-none ${
              darkMode
                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                : "bg-gradient-to-br from-yellow-300 to-yellow-400"
            }`}
          ></div>
          <div
            className={`hidden lg:block fixed bottom-32 left-8 w-12 h-12 rounded-xl shadow-lg animate-pulse -rotate-12 pointer-events-none ${
              darkMode
                ? "bg-gradient-to-br from-pink-400 to-red-500"
                : "bg-gradient-to-br from-pink-300 to-pink-400"
            }`}
          ></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">
          You do not have permission to access this page.
        </h1>
      </div>
    );
  }
};

// Separate InputField component to prevent re-renders
const InputField = React.memo(
  ({
    label,
    field,
    type = "text",
    placeholder,
    icon: Icon,
    required = false,
    multiline = false,
    formData,
    errors,
    darkMode,
    handleInputChange,
  }) => (
    <div className="space-y-2">
      <label
        className={`block text-sm font-semibold ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      </label>

      {multiline ? (
        <textarea
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
            darkMode
              ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/70"
              : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white"
          } ${errors[field] ? "border-red-500" : ""}`}
        />
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
            darkMode
              ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-800/70"
              : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white"
          } ${errors[field] ? "border-red-500" : ""}`}
        />
      )}

      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  )
);

InputField.displayName = "InputField";

export default PresetFormPage;
