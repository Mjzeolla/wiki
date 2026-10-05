import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { publicPath, siteConfig } from '@/config/site';
import './global.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { template: `%s | ${siteConfig.name}`, default: siteConfig.name },
  description: siteConfig.description,
  icons: { icon: publicPath('/icon.svg') },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{ options: { type: 'static', api: publicPath('/api/search') } }}
          theme={{
            // React 19.2 does not execute scripts rendered by client components. Mark the
            // next-themes bootstrap payload as inert until its upstream fix is released:
            // https://github.com/pacocoursey/next-themes/issues/385
            scriptProps: { type: 'application/json' },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
