import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";

import "@/app/globals.css";

import { Crimson_Pro, DM_Sans } from "next/font/google";

import { AppProvider } from "@/providers/app-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/sidebar/sidebar-inset";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  preload: true,
  display: "swap",
  variable: "--font-dm-sans",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  display: "swap",
  variable: "--font-crimson-pro",
});

export const metadata: Metadata = {
  title: "Didgori",
  description: "Didgori App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${crimsonPro.variable} antialiased`} suppressHydrationWarning>
      <body>
        <AppProvider>
          <main className="flex flex-1 flex-col antialiased">
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
            <Toaster />
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
