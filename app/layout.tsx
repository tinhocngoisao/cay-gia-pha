import type {Metadata} from 'next';
import { Playfair_Display, Crimson_Text, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-playfair',
});

const crimson = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-crimson',
});

const beVietnam = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam',
});

export const metadata: Metadata = {
  title: 'Trang thông tin Dòng họ Cao',
  description: 'Lưu giữ và tiếp nối truyền thống gia đình',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${crimson.variable} ${beVietnam.variable}`}>
      <body className="font-[family-name:var(--font-be-vietnam)] bg-[#C8BCA7] text-[#4A3F35] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
