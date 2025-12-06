import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Ango Higiene";
const description =
  "Higienização profissional de sofás, colchões, tapetes e interiores de viaturas em Luanda. Atendimento em domicílio, resultados rápidos e seguros.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.angohigiene.com"),
  title: {
    default: `${siteName} | Higienização profissional em Luanda`,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: `${siteName} | Higienização profissional em Luanda`,
    description,
    url: "https://www.angohigiene.com",
    siteName,
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Higienização profissional em Luanda`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
