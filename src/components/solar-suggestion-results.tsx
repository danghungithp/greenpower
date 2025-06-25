import type { SuggestSolarSystemOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, DollarSign, Leaf } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              className="text-primary underline transition-colors hover:text-primary/80"
              {...props}
            />
          ),
          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc space-y-1 pl-5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal space-y-1 pl-5" {...props} />
          ),
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

type SolarSuggestionResultsProps = {
  suggestion: SuggestSolarSystemOutput;
};

export function SolarSuggestionResults({ suggestion }: SolarSuggestionResultsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Gói Năng lượng mặt trời tùy chỉnh của bạn</h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gợi ý hệ thống
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MarkdownRenderer>{suggestion.systemSuggestion}</MarkdownRenderer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tiết kiệm ước tính
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MarkdownRenderer>{suggestion.estimatedSavings}</MarkdownRenderer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tác động môi trường
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MarkdownRenderer>{suggestion.environmentalImpact}</MarkdownRenderer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
