import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const noto = Noto_Sans_Thai({ subsets: ['thai'] });

export const metadata: Metadata = {
  title: 'Agnos - Assignment',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={noto.className}>{children}</body>
    </html>
  );
}
