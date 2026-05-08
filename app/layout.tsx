import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ServiceWorkerRegister } from '@/components/service-worker-register';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Aura Exam OS | Anime Productivity System',
  description: 'A futuristic anime-powered operating system for deep study, habits, focus, exam countdowns, and student discipline.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Aura Exam OS' },
  icons: { icon: '/icon.svg', apple: '/icon.svg' }
};

export const viewport: Viewport = { themeColor: '#050816', width: 'device-width', initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-body antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
