import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/i18n-context";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Instagram Unfollowers Tracker - FollowCheck",
  description:
    "Check who unfollowed you on Instagram. FollowCheck is a free tool that helps you track your Instagram followers and unfollowers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="antialiased font-body">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
