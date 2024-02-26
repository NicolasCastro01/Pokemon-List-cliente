import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserCredentialsProvider } from "~/@core/infra";
import "./home.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeHub | Home",
  description: "Página principal do melhor hub de pokemóns do Brasil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserCredentialsProvider>
      <html lang="pt-Br">
        <body className={inter.className}>{children}</body>
      </html>
    </UserCredentialsProvider>
  );
}
