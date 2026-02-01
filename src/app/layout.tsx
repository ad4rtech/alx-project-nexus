import type { Metadata } from "next";
import { Lexend, Funnel_Sans, Courier_Prime } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ['400', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectroProcure",
  description: "B2B Electronics Procurement Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${funnelSans.variable} ${courierPrime.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
