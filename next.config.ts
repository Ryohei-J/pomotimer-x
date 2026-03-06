import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Exclude .ts from pageExtensions so that proxy.ts and middleware.ts are not
  // detected as proxy/middleware files. The actual proxy is in proxy.tsx.
  pageExtensions: ["tsx", "js", "jsx", "mjs", "cjs"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com;",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
