import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static HTML export. `next build` writes a self-contained `out/` directory
   * that Cloudflare Pages serves directly — no Next.js server, no Node runtime
   * at request time.
   *
   * This is viable because the site has no API routes, middleware, server
   * actions, dynamic segments, or request-time data. Adding any of those would
   * mean revisiting this line first.
   */
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
