"use client";

    import * as React from "react";
    // import { ThemeProvider } from "@/components/theme-context";
    import { Navbar } from "@/components/nav-bar";
    import { usePathname } from "next/navigation";
    import { Footer } from "@/components/footer";
    import { ThemeProvider } from "next-themes";

    function ConditionalFooter() {
      const p = usePathname();
      if (p === "/book" || p.startsWith("/book?")) return null;
      return <Footer />;
    }

    export default function Providers({ children }: { children: React.ReactNode }) {
      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} // ← disable prefers‐color‐scheme
        >
          <Navbar />
          {children}
          <ConditionalFooter />
        </ThemeProvider>
      );
    }