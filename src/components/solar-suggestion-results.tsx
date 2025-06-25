import type { SuggestSolarSystemOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, DollarSign, Leaf } from 'lucide-react';

type SolarSuggestionResultsProps = {
  suggestion: SuggestSolarSystemOutput;
};

export function SolarSuggestionResults({ suggestion }: SolarSuggestionResultsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Your Custom Solar Plan</h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              System Suggestion
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap font-code">
              {suggestion.systemSuggestion}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Estimated Savings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {suggestion.estimatedSavings}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Environmental Impact
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {suggestion.environmentalImpact}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
