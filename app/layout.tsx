import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classroom Math Warmups",
  description: "Interactive math hook activities for the classroom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
