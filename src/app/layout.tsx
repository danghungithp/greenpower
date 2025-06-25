import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "Ứng dụng AI phân tích, tính toán, thiết kế hệ thống điện mặt trời miễn phí",
  description: "Ứng dụng AI miễn phí giúp bạn phân tích, tính toán, và thiết kế hệ thống điện mặt trời. Nhận gợi ý chi tiết về chi phí, vật tư, và hiệu quả kinh tế cho hệ thống hòa lưới, hybrid, và độc lập.",
  keywords: [
    'điện mặt trời', 
    'năng lượng mặt trời', 
    'tính toán điện mặt trời', 
    'thiết kế hệ thống điện mặt trời', 
    'AI cho điện mặt trời', 
    'công cụ tính toán năng lượng mặt trời', 
    'hệ thống điện mặt trời hòa lưới', 
    'hệ thống điện mặt trời hybrid', 
    'hệ thống điện mặt trời độc lập', 
    'chi phí lắp đặt điện mặt trời', 
    'tư vấn điện mặt trời'
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
