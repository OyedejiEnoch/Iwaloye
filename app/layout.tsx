import type { Metadata } from "next";
import { Poppins, Gentium_Book_Plus, Inter, Carattere } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import StoreProvider from "@/StoreProvider";
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  weight: ["500", "700"]
})

const gentium = Gentium_Book_Plus({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--gentium-font',
})

const carattere = Carattere({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--carattere-font',
})


export const metadata: Metadata = {
  title: "ADC Campaign | Osun State 2026",
  description: "A comprehensive plan for building a stronger, more prosperous Osun State.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${gentium.variable} ${inter.variable} ${carattere.variable} font-sans antialiased`}
      >
        <StoreProvider>
          <SmoothScroll>
            <Toaster />
            {children}
          </SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  );
}
