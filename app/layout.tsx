import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import { ToastProvider } from '../components/ui/toast';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Student Operating System" />
        <meta name="color-scheme" content="dark" />
        <title>StudOS — Discover. Connect. Build.</title>
      </head>
      <body className="bg-bg text-fg antialiased">
        <ToastProvider>
          <Header />
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}