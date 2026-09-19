import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '../components/Header';
import { ToastProvider } from '../components/ui/toast';
import { ThemeProvider } from '../components/ThemeProvider';
import { CosmicStarfield } from '../components/3d/CosmicStarfield';
import { Footer } from '../components/Footer';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jakarta.className}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="StudOS — Next-Gen Student Operating System. Personalized career pathways, curated college resources, collaborative innovation, and verified opportunities." />
        <meta name="theme-color" content="#070A1E" />
        <title>StudOS — Discover. Connect. Build.</title>
        {/* Prevent flash: apply stored theme before paint */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var t = localStorage.getItem('studos-theme');
              var root = document.documentElement;
              if (t === 'light') { root.classList.remove('dark'); root.classList.add('light'); }
              else { root.classList.add('dark'); root.classList.remove('light'); }
            } catch(e) {}
          `
        }} />
      </head>
      <body className="antialiased selection:bg-[#E11D48] selection:text-white min-h-screen relative flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <CosmicStarfield />
          <ToastProvider>
            <Header />
            <main className="min-h-[calc(100vh-80px)] flex-1 relative z-10 bg-transparent">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}