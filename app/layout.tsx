import type { Metadata } from "next";
import { Inter, Roboto_Mono, Geist } from "next/font/google";
import "./globals.css";
import { AuditHeader } from "@/components/AuditHeader";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Restoscopie",
  description: "Audit qualité interne Afrik'N'Fusion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-brand-light text-brand-text">
        <AuditHeader />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 md:px-8">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
