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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const solarSuggestionFormSchema = z.object({
  location: z.string().min(2, {
    message: 'Vui lòng chọn một vị trí.',
  }),
  energyRequirements: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Vui lòng nhập một số hợp lệ cho nhu cầu năng lượng.',
  }),
  roofSize: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Vui lòng nhập một số hợp lệ cho diện tích mái.',
  }),
});

export type SolarSuggestionFormValues = z.infer<typeof solarSuggestionFormSchema>;

type SolarSuggestionFormProps = {
  onSubmit: (data: SolarSuggestionFormValues) => void;
  isLoading: boolean;
};

const vietnamCities = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
  "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ",
  "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
  "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng",
  "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
  "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình",
  "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi",
  "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
].sort();


export function SolarSuggestionForm({ onSubmit, isLoading }: SolarSuggestionFormProps) {
  const form = useForm<SolarSuggestionFormValues>({
    resolver: zodResolver(solarSuggestionFormSchema),
    defaultValues: {
      location: '',
      energyRequirements: '',
      roofSize: '',
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành phố..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vietnamCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Chọn tỉnh/thành phố của dự án.</FormDescription>
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
                      <Input placeholder="ví dụ: 500" type="number" {...field} disabled={isLoading} />
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
                      <Input placeholder="ví dụ: 50" type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Diện tích mét vuông có thể sử dụng trên mái nhà của bạn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
