import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "AI Thiết kế Điện mặt trời | Tính toán & Báo giá Miễn phí",
  description: "Công cụ AI thiết kế hệ thống điện mặt trời miễn phí. Phân tích nhu cầu, nhận gợi ý thiết bị, sơ đồ đấu nối và báo giá chi tiết tức thì. Bắt đầu ngay!",
  keywords: [
    'ứng dụng ai thiết kế điện mặt trời',
    'thiết kế điện mặt trời miễn phí',
    'AI cho điện mặt trời',
    'công cụ tính toán năng lượng mặt trời',
    'phần mềm thiết kế điện mặt trời',
    'phân tích hệ thống điện mặt trời',
    'báo giá điện mặt trời',
    'hệ thống điện mặt trời hòa lưới', 
    'hệ thống điện mặt trời hybrid', 
    'hệ thống điện mặt trời độc lập', 
    'chi phí lắp đặt điện mặt trời', 
    'tư vấn điện mặt trời',
    'sơ đồ đấu nối điện mặt trời',
    'tính toán điện mặt trời'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
