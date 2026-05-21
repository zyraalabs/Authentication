import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Sign in — Zyraa",
  description: "Sign in or create your Zyraa account.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("zyraa-theme")?.value ?? "dark";

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        jetbrainsMono.variable,
        theme === "light" ? "" : "dark",
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.split('; ').find(function(r){return r.startsWith('zyraa-theme=')});var v=t?t.split('=')[1]:'dark';document.documentElement.classList.toggle('dark',v!=='light')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
