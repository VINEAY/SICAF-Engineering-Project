import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import type React from "react";
import ClientLayout from "@/components/layout/ClientLayout";
import { SectionFullTransitionProvider } from "@/components/ui/SectionFullTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SICAF Engineering - Engineering Excellence for Industrial Transformation",
  description:
    "SICAF Engineering provides industrial organizations with expertise and tools to achieve their full potential through optimized operational efficiency, improved workforce skills, and sustainable growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <SectionFullTransitionProvider>
          <ClientLayout>{children}</ClientLayout>
        </SectionFullTransitionProvider>
      </body>
    </html>
  );
}
