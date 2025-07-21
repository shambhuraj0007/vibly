import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthWrapper from "./auth-wrapper"
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "vibly by shambhuraj",
  description: "A simple, fast, and beautiful media platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
         <AuthWrapper>
          {children}
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
