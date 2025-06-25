import type { NextConfig } from 'next'

import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.NEXT_PUBLIC_DEV_URL ||
  process.env.__NEXT_PRIVATE_ORIGIN ||
  'http://localhost:3000'

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.NEXT_PUBLIC_DEV_ORIGIN || ''],
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        return new URL(item + '/**')
      }),
    ],
    unoptimized: true
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
