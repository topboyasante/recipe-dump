import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const font = Jost({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
