import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { THEME_STORAGE_KEY, ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yurirxmos portfolio.",
  description:
    "welcome to my personal portfolio website, talking about me personally and professionally.",
  icons: "/brand.png",
};

const themeScript = `(() => {
  try {
    const savedTheme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    const theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.className} ${firaCode.className} flex min-h-screen flex-col antialiased`}
      >
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="2e2ef658-5aa9-4210-8270-53e9414bbea5"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
