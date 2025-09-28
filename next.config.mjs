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
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'triplemcompany.com',
            },
        ],
    },
};

export default nextConfig;
