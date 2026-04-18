import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/providers/QueryProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | OhhCode.ai',
    absolute: 'OhhCode.ai',
  },
  keywords: ['Code.ai', 'Tasks', 'Next.js', 'React'],
  description: 'OhhCode.ai is a platform to create and manage code snippets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        suppressHydrationWarning
        lang='en'
        className={`antialiased ${spaceGrotesk.className}`}
      >
        <body className='min-h-screen flex  flex-col overflow-x-hidden'>
          <QueryProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className='flex-1 flex flex-col px-2 md:px-4'>
                {children}
              </main>
              <footer>Footer placeholder</footer>
              <Toaster position='top-center' expand richColors closeButton />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </>
  );
}
