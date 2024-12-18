/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: process.env.keyName, // pulls from .env file
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "ashleywildegroup.com" },
      { hostname: "en-sa.sssports.com" },
      { hostname: "media.zid.store" },
      { hostname: "flowbite.com" },
    ],
  },
};

export default nextConfig;
