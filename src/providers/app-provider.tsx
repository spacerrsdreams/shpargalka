import { AuthProvider } from "@/providers/auth-provider";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// TODO: Add system theme
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <QueryClientProvider>{children}</QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
