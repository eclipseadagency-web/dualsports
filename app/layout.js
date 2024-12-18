import { Lato as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Flowbite",
  description:
    "Discover a wide range of products at Flowbite - from the latest fashion trends to top electronics. Shop now for exclusive deals, fast shipping, and quality customer service. Your one-stop online shopping destination.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <SessionProvider>
          <main>{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
