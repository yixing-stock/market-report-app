import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Report",
  description: "Dashboard-style stock market reports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
