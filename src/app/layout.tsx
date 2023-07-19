import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StationProvider } from "./stationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeTune",
  description:
    "With CodeTune, coders can listen to music while they code,helping to boost their creativity, productivity and focus, The music is carefully curated to enhance the coding experience,  ensuring that it does not interfere with the flow of coding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StationProvider>
        <body className={inter.className}>{children}</body>
      </StationProvider>
    </html>
  );
}
