/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  eslint: {
    // Skip ESLint during `next build` to avoid build-time linting failures in environments
    // where ESLint configuration or environment may differ. Lint should still be run in CI.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
