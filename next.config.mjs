/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudinary.pikakasino.com", // Your existing domain
      "static.api.pikakasino.com", // Add this line for the new domain
    ],
  },
};

export default nextConfig;
