/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["masterbundles.com"],
  },
  // Add environment variables that should be available server-side
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    // Add any other sensitive server-side variables here
  },
  // Optional: Security headers
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
