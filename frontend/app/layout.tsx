import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "My Project",
  description: "Next.js + FastAPI app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="light">
<body className="bg-gray-100 text-gray-900">
  <Header />
  <main className="pt-16">{children}</main>
</body>

    </html>
  );
}
