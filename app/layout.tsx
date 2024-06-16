import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/ui/navbar";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Simple Crypto Tracker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "bg-[#1B0404] text-[#c0c0c0]")}>
        <Navbar />

        <main className="items-center justify-between px-1 pb-16 pt-12 sm:pb-2 sm:pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
