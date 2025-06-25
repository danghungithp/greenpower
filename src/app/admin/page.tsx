"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2 } from "lucide-react";

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [customData, setCustomData] = React.useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  React.useEffect(() => {
    if (isAuthenticated) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setCustomData(savedData);
      }
    }
  }, [isAuthenticated]);

  const handleSaveCustomData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, customData);
    toast({
      title: "Đã lưu thành công!",
      description: "Nguồn dữ liệu tùy chỉnh của bạn đã được cập nhật và sẽ được sử dụng cho các gợi ý AI.",
    });
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Bảng điều khiển Quản trị viên
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Quản lý nguồn dữ liệu tùy chỉnh để cải thiện chất lượng gợi ý của AI.
        </p>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Hướng dẫn cách hoạt động</AlertTitle>
        <AlertDescription>
          <p>
            Dữ liệu bạn nhập vào ô bên dưới sẽ được AI ưu tiên sử dụng khi tạo gợi ý và báo giá. AI sẽ phân tích nội dung bạn cung cấp để lấy thông tin về tên sản phẩm, giá cả, và các thông số kỹ thuật.
          </p>
          <p className="mt-2">
            <strong>Ví dụ:</strong> Bạn có thể dán một hoặc nhiều dòng, mỗi dòng chứa thông tin về một sản phẩm như sau:
          </p>
          <pre className="mt-2 rounded-md bg-muted p-4 text-xs font-code">
            <code>
              Tấm pin mặt trời Canadian Solar 550W - Giá: 2.750.000₫ - https://example.com/canadian-solar-550w<br/>
              Inverter Hybrid Deye 5kW - https://example.com/deye-hybrid-5kw<br/>
              Pin lưu trữ Lithium SVE 100Ah - Giá 15.000.000₫
            </code>
          </pre>
          <p className="mt-2">
            Bạn chỉ cần dán URL, hoặc thêm tên và giá để AI có thông tin chính xác hơn. Sau khi lưu, dữ liệu này sẽ tự động được áp dụng cho các chức năng AI trên toàn bộ trang web.
          </p>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Nguồn dữ liệu tùy chỉnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
              <Label htmlFor="custom-data-textarea">Nội dung nguồn (URL, văn bản, ...)</Label>
              <Textarea
                id="custom-data-textarea"
                placeholder="Dán các URL sản phẩm, bài viết, hoặc ghi chú của bạn vào đây. Mỗi sản phẩm trên một dòng."
                className="mt-2 min-h-[150px] font-code"
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
              />
               <p className="text-sm text-muted-foreground mt-2">
                Thông tin này sẽ được lưu trên trình duyệt của bạn và tự động được sử dụng cho các chức năng AI.
              </p>
            </div>
          <Button onClick={handleSaveCustomData}>Lưu dữ liệu tùy chỉnh</Button>
        </CardContent>
      </Card>
    </div>
  );
}
