"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

export default function AdminPage() {
  const [customData, setCustomData] = React.useState('');
  const { toast } = useToast();

  React.useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setCustomData(savedData);
    }
  }, []);

  const handleSaveCustomData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, customData);
    toast({
      title: "Đã lưu thành công!",
      description: "Nguồn dữ liệu tùy chỉnh của bạn đã được cập nhật và sẽ được sử dụng cho các gợi ý AI.",
    });
  };

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

      <Card>
        <CardHeader>
          <CardTitle>Nguồn dữ liệu tùy chỉnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
              <Label htmlFor="custom-data-textarea">Nội dung nguồn (URL, văn bản, ...)</Label>
              <Textarea
                id="custom-data-textarea"
                placeholder="Dán các URL sản phẩm, bài viết, hoặc ghi chú của bạn vào đây..."
                className="mt-2 min-h-[150px]"
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
              />
               <p className="text-sm text-muted-foreground mt-2">
                Thông tin này sẽ được lưu trên trình duyệt của bạn và tự động sử dụng cho các gợi ý AI trên trang chủ.
              </p>
            </div>
          <Button onClick={handleSaveCustomData}>Lưu dữ liệu tùy chỉnh</Button>
        </CardContent>
      </Card>
    </div>
  );
}
