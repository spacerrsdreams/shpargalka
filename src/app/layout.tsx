import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";

import "@/app/globals.css";

import { AppProvider } from "@/providers/app-provider";
import { AiChatDrawer } from "@/components/ai-chat-drawer/ai-chat-drawer";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/sidebar/sidebar-inset";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Shpargalka",
  description: "Shpargalka App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <main className="flex flex-1 flex-col subpixel-antialiased">
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
              <AiChatDrawer />
            </SidebarProvider>
            <Toaster />
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
