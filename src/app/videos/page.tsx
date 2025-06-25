"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const videos = [
  {
    id: 'BqJd0b_2M5c',
    title: 'Hướng Dẫn Lắp Đặt Điện Mặt Trời Cho Người Mới Bắt Đầu',
    description: 'Video chi tiết về quy trình lắp đặt hệ thống điện mặt trời áp mái, phù hợp cho người mới.'
  },
  {
    id: '4p24-yFkGzY',
    title: 'Có nên lắp Điện mặt trời năm 2024? Bài toán kinh tế',
    description: 'Phân tích chi tiết về hiệu quả kinh tế, chi phí và lợi ích khi đầu tư điện mặt trời trong năm 2024.'
  },
  {
    id: 'Rj7c_B2z_gY',
    title: 'Báo Giá Chi Tiết Hệ Thống Điện Mặt Trời 5kWp Mới Nhất',
    description: 'Cung cấp thông tin tham khảo về chi phí trọn gói cho một hệ thống điện mặt trời công suất 5kWp.'
  },
  {
    id: 'wO_GvVyb1cc',
    title: 'Hệ Thống Điện Năng Lượng Mặt Trời Hybrid Là Gì?',
    description: 'Giải thích nguyên lý hoạt động, ưu và nhược điểm của hệ thống điện mặt trời hybrid (hòa lưới có lưu trữ).'
  },
  {
    id: 'uYf9fA_wWwE',
    title: '10 Sai Lầm Cần Tránh Khi Lắp Điện Mặt Trời',
    description: 'Tổng hợp những kinh nghiệm và sai lầm thường gặp để giúp bạn có một hệ thống hiệu quả và bền bỉ.'
  },
   {
    id: 'm4uQy-v8H7I',
    title: 'Cách Tính Toán Hệ Thống Điện Mặt Trời Độc Lập (Off-Grid)',
    description: 'Hướng dẫn chi tiết các bước tính toán công suất pin, inverter và bộ lưu trữ cho hệ thống off-grid.'
  }
];

export default function VideosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Thư viện Videos
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Tổng hợp các video hướng dẫn, chia sẻ kinh nghiệm về lắp đặt và sử dụng điện mặt trời.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardContent className="p-0">
               <div className="aspect-video">
                 <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
               </div>
            </CardContent>
             <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
               <CardDescription className="pt-2">{video.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
