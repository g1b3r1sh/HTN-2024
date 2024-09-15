import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import './globals.css';
import { ConvexClientProvider } from "./ConvexClientProvider";

const exo = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deploy with Defang",
  description: "Deploy your Next.js app with Defang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
