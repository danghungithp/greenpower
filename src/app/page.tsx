"use client";

import React from "react";
import { suggestSolarSystemAction } from "@/app/actions";
import type { SuggestSolarSystemOutput } from "@/lib/types";
import { SolarSuggestionForm } from "@/components/solar-suggestion-form";
import { SolarSuggestionResults } from "@/components/solar-suggestion-results";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [suggestion, setSuggestion] =
    React.useState<SuggestSolarSystemOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (formData: {
    location: string;
    energyRequirements: string;
    roofSize: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const result = await suggestSolarSystemAction(formData);
    
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
          Gợi ý hệ thống năng lượng mặt trời bằng AI
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Điền các thông tin chi tiết bên dưới để nhận được đề xuất hệ thống pin mặt trời được cá nhân hóa từ AI của chúng tôi.
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
