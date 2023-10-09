import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biwak Anmeldung 2024",
  description:
    "Anmeldung für den Biwak der KG Knallköpp Golkrath für das Jahr 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col  items-center gap-12 px-12 py-6 md:gap-16 md:px-16 md:py-8 lg:px-24 lg:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
