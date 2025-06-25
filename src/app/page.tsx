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
        "Failed to generate a suggestion. Please try again with different values."
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          AI Solar System Suggestion
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill in the details below to get a personalized solar panel system
          recommendation from our AI.
        </p>
      </div>
      <SolarSuggestionForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          <p className="font-semibold">An error occurred</p>
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
