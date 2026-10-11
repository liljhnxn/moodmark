import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MoodMark — Web3 Mood Tracker on Botchain",
  description: "Connect your wallet, choose your mood, and record it permanently on the Botchain blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[#090b14] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-purple-500 selection:text-white"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
