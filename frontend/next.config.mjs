/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "picsum.photos",
      "lh3.googleusercontent.com",
      "wenet-listonfermi.s3.ap-south-1.amazonaws.com",
      "i.pravatar.cc",
    ],
  },
};

export default nextConfig;
