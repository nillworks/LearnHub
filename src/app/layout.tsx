import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import NavigationMenu from "@/components/shared/NavigationMenu";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnHub",
  description: "LearnHub - The best course platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-dark-bg text-text-primary dark:text-surface transition-colors duration-300">
        <Toaster position="bottom-right" richColors />
        <Providers>
          <NavigationMenu user={session?.user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
