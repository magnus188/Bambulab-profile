import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Temporarily disabled for testing
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import AnalyticsProvider from "../components/AnalyticsProvider";

// const inter = Inter({ subsets: ["latin"] }); // Temporarily disabled for testing

export const metadata: Metadata = {
  title: "Bambu Lab Filament Profiles",
  description: "Community-driven filament profiles for Bambu Lab 3D printers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <AnalyticsProvider />
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
