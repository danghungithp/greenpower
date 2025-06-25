"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const videos = [
  {
    id: 'u6Y7YqX_Y-0',
    title: 'Hướng dẫn TỰ LẮP ĐẶT ĐIỆN MẶT TRỜI áp mái chi tiết',
    description: 'Video hướng dẫn chi tiết các bước tự lắp đặt một hệ thống điện mặt trời áp mái cho gia đình.'
  },
  {
    id: 'Cq_T-c_Qk-s',
    title: 'Đầu tư điện mặt trời 2024: Nên hay không? | VTV24',
    description: 'Phân tích xu hướng, chi phí và hiệu quả của việc đầu tư điện mặt trời trong năm 2024 từ kênh VTV24.'
  },
  {
    id: 'Vz-yM4o0ZcM',
    title: 'Cách tính toán công suất hệ thống điện mặt trời',
    description: 'Hướng dẫn chi tiết cách tính toán công suất hệ thống cần lắp, chi phí và thời gian hoàn vốn.'
  },
  {
    id: '5z_2yO6n-m8',
    title: 'Cách sử dụng điện mặt trời hiệu quả, tiết kiệm điện',
    description: 'Các mẹo và kinh nghiệm thực tế để tối ưu hóa việc sử dụng năng lượng từ hệ thống điện mặt trời của bạn.'
  },
  {
    id: 'Jg_T5g3a1Jc',
    title: 'Tự lắp đặt hệ thống điện mặt trời 5.5kWp cho gia đình',
    description: 'Một video hướng dẫn thực tế về việc lắp đặt một hệ thống điện mặt trời hòa lưới cho gia đình.'
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
