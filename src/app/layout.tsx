import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { FavoriteProvider } from "@/context";

const poppins = Poppins({ 
  weight: ['400', '700', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
 });

export const metadata: Metadata = {
  title: "App Casar",
  description: "App Casar.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <FavoriteProvider>
          <NavBar/>
          {children}
        </FavoriteProvider>
      </body>
    </html>
  );
}
