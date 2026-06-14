/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @xenova/transformers is an optional dependency, only loaded at runtime when
  // EMBEDDING_PROVIDER=local. Marking it external keeps webpack from trying to
  // bundle (and fail to resolve) it when it isn't installed.
  serverExternalPackages: ["@xenova/transformers"],
};

export default nextConfig;
