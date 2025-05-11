import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Shield } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IDS - Intrusion Detection System',
  description: 'Advanced network security and intrusion detection system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-xl">IDS</span>
              </Link>
              <div className="space-x-8">
                <Link href="/" className="hover:text-primary">Home</Link>
                <Link href="/about" className="hover:text-primary">About</Link>
                <Link href="/contact" className="hover:text-primary">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="border-t py-8 mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-xl">IDS</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2024 IDS Security By Nikhil Kumar & Team. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}