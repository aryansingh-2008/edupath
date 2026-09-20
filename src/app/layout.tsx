import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduPath - Adaptive Career Learning Agent',
  description: 'Your skills today. Your career tomorrow. One adaptive path.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c16] text-slate-100 antialiased selection:bg-blue-600 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
