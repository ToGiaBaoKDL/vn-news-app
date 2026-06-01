import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VN News Intelligence",
  description: "Vietnamese news collection, search, and trend intelligence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
