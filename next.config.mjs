/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     allowedDevOrigins: ['http://16.16.183.92:9090'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9090',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dwok2hmb7/image/upload/**',
            },
        ],
    },
};

export default nextConfig;
