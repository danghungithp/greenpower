"use client";

import React from "react";
import { suggestSolarSystemAction } from "@/app/actions";
import type { SuggestSolarSystemOutput } from "@/lib/types";
import { SolarSuggestionForm, type SolarSuggestionFormValues } from "@/components/solar-suggestion-form";
import { SolarSuggestionResults } from "@/components/solar-suggestion-results";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

export default function AdminPage() {
  const [suggestion, setSuggestion] =
    React.useState<SuggestSolarSystemOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
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
      description: "Nguồn dữ liệu tùy chỉnh của bạn đã được cập nhật.",
    });
  };

  const handleSubmit = async (formData: SolarSuggestionFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const submissionData = {
      ...formData,
      customData: customData,
    };
    const result = await suggestSolarSystemAction(submissionData);
    
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.systemSuggestion) {
      setSuggestion(result);
    } else {
      setError(
        "Không thể tạo đề xuất. Vui lòng thử lại với các giá trị khác."
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Bảng điều khiển Quản trị viên
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Quản lý nguồn dữ liệu tùy chỉnh và sử dụng công cụ gợi ý để có kết quả tốt hơn.
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
                Thông tin này sẽ được lưu trên trình duyệt của bạn và tự động sử dụng cho các gợi ý AI.
              </p>
            </div>
          <Button onClick={handleSaveCustomData}>Lưu dữ liệu tùy chỉnh</Button>
        </CardContent>
      </Card>

      <SolarSuggestionForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          <p className="font-semibold">Đã xảy ra lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && <SolarSuggestionSkeleton />}
      {suggestion && <SolarSuggestionResults suggestion={suggestion} />}
    </div>
  );
}

function SolarSuggestionSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
