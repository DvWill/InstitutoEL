import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { HOME_SEO, SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

const heading = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});
const text = Inter({
  variable: '--font-text',
  subsets: ['latin'],
  display: 'swap',
});

// Base de todas as URLs absolutas (canonical, og:url, og:image). A página define
// o próprio title/description/canonical via homeMetadata() em lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: { type: 'website', locale: 'pt_BR', siteName: SITE_NAME },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}
