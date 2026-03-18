import type {Metadata} from 'next';
import { Lora, Inter } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Gia Phả Dòng Họ',
  description: 'Lưu giữ và tiếp nối truyền thống gia đình',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#C8BCA7] text-[#4A3F35] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
