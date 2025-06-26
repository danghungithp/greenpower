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
    'tính toán điện mặt trời',
    // SEO tỉnh/thành phố
    'lắp đặt hệ thống điện mặt trời giá rẻ tại An Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bà Rịa - Vũng Tàu',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Kạn',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bạc Liêu',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Ninh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bến Tre',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Định',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Dương',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Phước',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Thuận',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Cà Mau',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Cần Thơ',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Cao Bằng',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Đà Nẵng',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Đắk Lắk',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Đắk Nông',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Điện Biên',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Đồng Nai',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Đồng Tháp',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Gia Lai',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Nam',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Nội',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Tĩnh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hải Dương',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hải Phòng',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hậu Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hòa Bình',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Hưng Yên',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Khánh Hòa',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Kiên Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Kon Tum',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Lai Châu',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Lâm Đồng',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Lạng Sơn',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Lào Cai',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Long An',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Nam Định',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Nghệ An',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Ninh Bình',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Ninh Thuận',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Phú Thọ',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Phú Yên',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Bình',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Nam',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Ngãi',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Ninh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Trị',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Sóc Trăng',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Sơn La',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Tây Ninh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Thái Bình',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Thái Nguyên',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Thanh Hóa',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Thừa Thiên Huế',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Tiền Giang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại TP Hồ Chí Minh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Trà Vinh',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Tuyên Quang',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Vĩnh Long',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Vĩnh Phúc',
    'lắp đặt hệ thống điện mặt trời giá rẻ tại Yên Bái'
  ],
  icons: null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="O5UG39IuxDyqOc7yrMpJFUrwfmnDxWbDbqe4LhNUwiU" />
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
        {/* SEO: Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(require('../../public/schema-org.json')) }} />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
