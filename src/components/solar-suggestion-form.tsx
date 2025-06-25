'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export const solarSuggestionFormSchema = z.object({
  location: z.string().min(2, {
    message: 'Vị trí phải có ít nhất 2 ký tự.',
  }),
  energyRequirements: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Vui lòng nhập một số hợp lệ cho nhu cầu năng lượng.',
  }),
  roofSize: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Vui lòng nhập một số hợp lệ cho diện tích mái.',
  }),
  customData: z.string().optional(),
});

export type SolarSuggestionFormValues = z.infer<typeof solarSuggestionFormSchema>;

type SolarSuggestionFormProps = {
  onSubmit: (data: SolarSuggestionFormValues) => void;
  isLoading: boolean;
  showCustomDataField?: boolean;
};

export function SolarSuggestionForm({ onSubmit, isLoading, showCustomDataField = false }: SolarSuggestionFormProps) {
  const form = useForm<SolarSuggestionFormValues>({
    resolver: zodResolver(solarSuggestionFormSchema),
    defaultValues: {
      location: '',
      energyRequirements: '',
      roofSize: '',
      customData: '',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin dự án</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vị trí lắp đặt</FormLabel>
                    <FormControl>
                      <Input placeholder="ví dụ: Thành phố Hồ Chí Minh" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Thành phố hoặc khu vực của dự án.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energyRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhu cầu năng lượng hàng tháng (kWh)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500" type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Mức sử dụng điện trung bình hàng tháng.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roofSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diện tích mái khả dụng (m²)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50" type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Diện tích mét vuông có thể sử dụng trên mái nhà của bạn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {showCustomDataField && (
               <FormField
                control={form.control}
                name="customData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nguồn dữ liệu tùy chỉnh (tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dán các URL sản phẩm, bài viết, hoặc ghi chú của bạn vào đây..."
                        className="min-h-[120px]"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Cung cấp thêm thông tin để AI đưa ra gợi ý chính xác hơn dựa trên dữ liệu của bạn.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo gợi ý
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
