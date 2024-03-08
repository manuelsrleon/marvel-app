import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { FavoritesProvider } from "./FavoritesContext";
import "./globals.css";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Challenge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
