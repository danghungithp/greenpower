"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const videos = [
  {
    id: 'Jg_T5g3a1Jc',
    title: 'Tự lắp đặt hệ thống điện mặt trời 5.5kWp cho gia đình',
    description: 'Hướng dẫn chi tiết các bước để tự mình lắp đặt một hệ thống điện mặt trời hòa lưới cho gia đình.'
  },
  {
    id: 'k6oJ_nB_z-A',
    title: 'Chi phí lắp điện mặt trời cho gia đình năm 2024 là bao nhiêu?',
    description: 'Phân tích chi tiết về chi phí đầu tư, các loại hệ thống và những điều cần lưu ý khi lắp đặt điện mặt trời.'
  },
  {
    id: '8g-n2p7Q_oA',
    title: 'Cách tính toán đầu tư điện mặt trời hiệu quả cho hộ gia đình',
    description: 'Hướng dẫn cách tính toán công suất hệ thống cần lắp, chi phí và thời gian hoàn vốn một cách chi tiết.'
  },
  {
    id: 'r_s9d-tH4QY',
    title: 'Bí quyết sử dụng điện mặt trời hiệu quả, tiết kiệm tối đa',
    description: 'Các mẹo và kinh nghiệm thực tế để tối ưu hóa việc sử dụng năng lượng từ hệ thống điện mặt trời của bạn.'
  },
    {
    id: 'O-qY_bJg-Yg',
    title: 'Hướng Dẫn Tự Lắp Đặt Bộ Điện Năng Lượng Mặt Trời 1000W',
    description: 'Một video hướng dẫn thực tế về việc lắp đặt một hệ thống điện mặt trời độc lập quy mô nhỏ.'
  },
   {
    id: 'uRlaDe_HpSo',
    title: 'Cách sử dụng điện mặt trời Hybrid hiệu quả nhất',
    description: 'Tìm hiểu về nguyên lý hoạt động và cách cài đặt để tối ưu hóa hệ thống điện mặt trời Hybrid.'
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
