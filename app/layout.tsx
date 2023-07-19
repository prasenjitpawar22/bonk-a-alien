import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

const press_Start_2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bonk a Astro",
  description: "Bonk a Astro game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={press_Start_2P.className}>{children}</body>
    </html>
  );
}
