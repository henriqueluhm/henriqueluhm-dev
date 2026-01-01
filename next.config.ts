import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
