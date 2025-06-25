import type { SuggestSolarSystemOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, DollarSign, Leaf, Zap, PanelTop, GitBranch, Battery, PiggyBank } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Separator } from './ui/separator';

const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
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

type ResultItemProps = {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}

const ResultItem = ({ icon: Icon, label, value }: ResultItemProps) => (
  <div className="flex items-start">
    <Icon className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
    <div>
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
);


type SolarSuggestionResultsProps = {
  suggestion: SuggestSolarSystemOutput;
};

export function SolarSuggestionResults({ suggestion }: SolarSuggestionResultsProps) {
  const { systemType, panel, inverter, storage, estimatedCost, estimatedSavings, environmentalImpact, notes } = suggestion;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Gói Năng lượng mặt trời tùy chỉnh của bạn</h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-primary" />
              Cấu hình hệ thống đề xuất
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <ResultItem icon={Zap} label="Loại hệ thống" value={systemType} />
             <ResultItem icon={PanelTop} label="Tấm pin" value={`${panel.quantity} x ${panel.type} (Tổng: ${panel.totalPower})`} />
             <ResultItem icon={GitBranch} label="Inverter" value={inverter.type} />
             {storage.needed && storage.capacity && (
               <ResultItem icon={Battery} label="Lưu trữ" value={storage.capacity} />
             )}
            <Separator />
            <ResultItem icon={PiggyBank} label="Chi phí ước tính" value={<span className="font-bold text-lg text-primary">{estimatedCost}</span>} />

            {notes && (
              <>
                <Separator />
                <div>
                    <p className="font-medium text-foreground mb-2">Ghi chú từ AI</p>
                    <MarkdownRenderer>{notes}</MarkdownRenderer>
                </div>
              </>
            )}

          </CardContent>
        </Card>
        
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hiệu quả Kinh tế
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{estimatedSavings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tác động Môi trường
              </CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{environmentalImpact}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
