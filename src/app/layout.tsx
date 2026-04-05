import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { Providers } from '@/components/providers';
import { APP_NAME } from '@/constants';

import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
