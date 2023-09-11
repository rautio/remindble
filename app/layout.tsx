import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { APIProvider } from "@/context/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remind After",
  description: "A simple reminder application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(inter.className, "dark")}
        style={{ colorScheme: "dark" }}
      >
        <body>
          <ThemeProvider>
            <APIProvider>
              <div className="flex min-h-screen w-full flex-col items-center dark:bg-black">
                <NavBar />
                <Separator />
                <main className="flex flex-grow flex-col min-h-screen w-full justify-center items-center dark:bg-neutral-950">
                  <Toaster />
                  <div className="flex flex-grow w-full justify-center">
                    <div className="max-w-[920px] flex flex-col flex-grow px-4 py-12">
                      {children}
                    </div>
                  </div>
                </main>
              </div>
            </APIProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
