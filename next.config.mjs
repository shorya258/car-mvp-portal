/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/signIn",
          permanent: true, 
        },
      ];
    },
    reactStrictMode: false,
  };
  
  export default nextConfig;
  