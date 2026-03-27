import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
