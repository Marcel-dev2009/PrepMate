import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import {Toaster} from "sonner";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title:{
    default :"PrepMate",
    template : "%s | PrepMate"
  },
  description: "Level up your learning experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans overflow-x-hidden", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
      
          {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}