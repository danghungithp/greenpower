"use client";

import React from "react";
import { suggestSolarSystemAction } from "@/app/actions";
import type { SuggestSolarSystemOutput } from "@/lib/types";
import { SolarSuggestionForm, type SolarSuggestionFormValues } from "@/components/solar-suggestion-form";
import { SolarSuggestionResults } from "@/components/solar-suggestion-results";
import { Skeleton } from "@/components/ui/skeleton";

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

export default function Home() {
  const [suggestion, setSuggestion] =
    React.useState<SuggestSolarSystemOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (formData: SolarSuggestionFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const customData = localStorage.getItem(LOCAL_STORAGE_KEY) || '';

    const submissionData = {
      ...formData,
      customData,
    };

    const result = await suggestSolarSystemAction(submissionData);
    
    setIsLoading(false);
    if ("error" in result) {
      setError(result.error);
    } else if (result.systemType) {
      setSuggestion(result);
    } else {
      setError(
        "Không thể tạo đề xuất. Vui lòng thử lại với các giá trị khác."
      );
    }
  };

  return (
    <>
      {/* SEO: Meta description cho trang chủ */}
      <head>
        <title>AI Thiết kế Điện mặt trời | Gợi ý hệ thống cá nhân hóa</title>
        <meta name="description" content="Nhận gợi ý hệ thống điện mặt trời cá nhân hóa bằng AI. Phân tích nhu cầu, báo giá, sơ đồ và thiết bị phù hợp nhất cho bạn." />
      </head>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Gợi ý hệ thống điện mặt trời cá nhân hóa bằng AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Điền các thông tin chi tiết bên dưới để nhận được đề xuất hệ thống pin mặt trời phù hợp nhất từ AI của chúng tôi.
          </p>
        </div>
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
    </>
  );
}

function SolarSuggestionSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
       <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-6">
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
