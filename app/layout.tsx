// app/layout.tsx

import { AuthProvider } from '@/context/AuthContext'
import ClientSessionProvider from './ClientSessionProvider';
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Auth App',
  description: 'A simple authentication app with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ClientSessionProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
          </AuthProvider>
          </ThemeProvider>
          </ClientSessionProvider>
      </body>
    </html>
  );
}