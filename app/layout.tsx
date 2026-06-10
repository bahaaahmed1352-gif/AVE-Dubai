import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AVE Dubai — A New Ritual Awaits',
  description:
    'AVE Dubai is an ultra-premium restaurant, café, and fine dining destination overlooking the Dubai Fountain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-obsidian">
      <body className="bg-obsidian text-cream">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setVh() {
                  const vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                }
                window.addEventListener('resize', setVh);
                setVh();
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
