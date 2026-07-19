import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const env = process.env.NEXT_PUBLIC_ENV;
const envPath = `./src/configs/env/${env}.ts`;
const envConfig = require(envPath).default;

const nextConfig: NextConfig = {
    ...envConfig,
    reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin('./src/locales/i18n.ts');

export default withNextIntl(nextConfig);
