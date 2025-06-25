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

const formSchema = z.object({
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  energyRequirements: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Please enter a valid number for energy requirements.',
  }),
  roofSize: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Please enter a valid number for roof size.',
  }),
});

type SolarSuggestionFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function SolarSuggestionForm({ onSubmit, isLoading }: SolarSuggestionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      energyRequirements: '',
      roofSize: '',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
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
                    <FormLabel>Property Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ho Chi Minh City" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>City or region of the property.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energyRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Energy Needs (kWh)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500" type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Average monthly electricity usage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roofSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Roof Area (m²)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50" type="number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>The usable square meters of your roof.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Suggestion
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
