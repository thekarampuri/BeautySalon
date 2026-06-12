import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Mahalaxmi Beauty Salon & Academy',
    template: '%s | Mahalaxmi Beauty Salon & Academy',
  },
  description:
    'Pune\'s premier beauty salon and professional academy. Expert bridal makeup, hair styling, skincare, and certified beauty courses.',
  keywords: ['beauty salon', 'bridal makeup', 'beauty academy', 'Pune salon', 'makeup courses'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
