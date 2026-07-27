import { Syne, DM_Sans } from "next/font/google";
import AdminEditToolbar from "@/components/admin/AdminEditToolbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "ilhamddy | Portfolio & IT Consultant",
  description: "Website Portofolio ilhamddy - Frontend Developer & IT Consultant. Solusi web modern, cepat, responsif, dan berdampak.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        {children}
        <AdminEditToolbar />
      </body>
    </html>
  );
}
