import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProviderPage from "./_components/QueryClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Das InfoTech admin panel built with love by Supriyo@",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProviderPage>
      <ClerkProvider
        appearance={{
          elements: {},
        }}
      >
        <html lang="en">
          <body
            className={`${outfit.className} antialiased bg-base-300  min-h-screen`}
          >
            {children}
            <Toaster
              toastOptions={{ position: "top-center", duration: 1500 }}
            />
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProviderPage>
  );
}
