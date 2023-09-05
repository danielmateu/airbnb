/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        unoptimized: true,
        domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
    // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

module.exports = nextConfig
