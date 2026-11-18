import type { Metadata } from "next";
import { Charmonman, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const charmonman = Charmonman({
  variable: "--font-signature",
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ส่องพระ AI | ตรวจตำหนิและเช็กราคากลางพระเครื่อง",
  description:
    "เว็บแอปถ่ายภาพตรวจตำหนิพระเครื่อง 2 ด้าน พร้อมวงกลมชี้จุดตำหนิและประเมินราคากลางตามภูมิภาค",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${charmonman.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#12100E] text-[#F5EFE6]">
        {children}
      </body>
    </html>
  );
}
