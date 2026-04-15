import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmanZone | Pro Construction Supply",
  description: "Enterprise B2B construction supply and heavy materials. Direct-to-site logistics in 15 days.",
  openGraph: {
    title: "AmanZone | B2B Procurement Hub",
    description: "Source heavy materials instantly. Bypass the middleman.",
    url: "https://amanzone.com", 
    siteName: "AmanZone",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AmanZone Construction Supply",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}