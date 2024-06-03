import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "bg-[#1B0404] text-[#c0c0c0]")}>
        <Navbar />

        <main className="container mx-auto items-center justify-between px-1 pt-10 sm:px-16 sm:pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
