import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // Ensure you have this path correct

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CreativeAgencyCareers - Germany's Creative Jobs Hub",
  description: "Discover game-changing roles at leading creative agencies in Germany. From industry titans to rising stars, find curated job offers tailored for both fresh faces and seasoned veterans. Your next career move starts here.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster /> {/* Add the Toaster component here */}
      </body>
    </html>
  );
}