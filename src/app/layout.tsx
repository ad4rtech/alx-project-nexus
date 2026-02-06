'use client';

import { Lexend, Funnel_Sans, Courier_Prime } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/context/ToastContext";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lexend.variable} ${funnelSans.variable} ${courierPrime.variable} antialiased`}
      >
        <ReduxProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
