/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS === 'true',
  },
  // Enable static optimization - use 'export' for GitHub Pages
  output: process.env.GITHUB_ACTIONS === 'true' ? 'export' : 'standalone',
  // Base path for GitHub Pages (when deployed to a subdirectory)
  basePath: process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY ? 
    `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY ? 
    `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '',
  
  // Compress images
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Environment variables validation
  env: {
    CUSTOM_BUILD_TIME: new Date().toISOString(),
  },
  
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
