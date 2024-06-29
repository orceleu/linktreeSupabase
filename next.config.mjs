/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "otuqsjkpvrkthepuffcs.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
