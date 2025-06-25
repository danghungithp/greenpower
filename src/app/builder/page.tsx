"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { buildSolarSystemAction } from '../actions';
import type { BuildSolarSystemOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function BuilderPage() {
  const [systemType, setSystemType] = React.useState('grid-tie');
  const [powerCapacity, setPowerCapacity] = React.useState('3');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<BuildSolarSystemOutput | null>(
    null
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await buildSolarSystemAction({
      systemType,
      powerCapacity: parseFloat(powerCapacity),
    });

    setIsLoading(false);
    if ('error' in response) {
      setError(response.error);
    } else {
      setResult(response);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Xây dựng Hệ thống Điện Mặt trời
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Chọn các thông số để AI tạo ra một thiết kế hệ thống hoàn chỉnh cho bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông số hệ thống</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="system-type">Loại hệ thống</Label>
              <Select
                value={systemType}
                onValueChange={setSystemType}
                disabled={isLoading}
              >
                <SelectTrigger id="system-type">
                  <SelectValue placeholder="Chọn loại hệ thống..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid-tie">Hòa lưới (Không lưu trữ)</SelectItem>
                  <SelectItem value="hybrid">Hybrid (Hòa lưới có lưu trữ)</SelectItem>
                  <SelectItem value="off-grid">Độc lập (Off-grid)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power-capacity">Công suất mong muốn</Label>
              <Select
                value={powerCapacity}
                onValueChange={setPowerCapacity}
                disabled={isLoading}
              >
                <SelectTrigger id="power-capacity">
                  <SelectValue placeholder="Chọn công suất..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 kWp</SelectItem>
                  <SelectItem value="3">3 kWp</SelectItem>
                  <SelectItem value="5">5 kWp</SelectItem>
                  <SelectItem value="10">10 kWp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Tạo hệ thống
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          <p className="font-semibold">Đã xảy ra lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {isLoading && <ResultsSkeleton />}

      {result && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Sơ đồ đấu nối hệ thống</CardTitle>
              <CardDescription>
                Sơ đồ nguyên lý các thành phần chính trong hệ thống của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="w-full overflow-x-auto rounded-lg border bg-background p-4"
                dangerouslySetInnerHTML={{ __html: result.diagramSvg }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông số kỹ thuật thiết bị</CardTitle>
              <CardDescription>
                Thông tin chi tiết về các thiết bị được đề xuất.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Thiết bị</TableHead>
                    <TableHead>Thông số chi tiết</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.specifications.map((spec, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {spec.component}
                      </TableCell>
                      <TableCell>{spec.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bảng vật tư và chi phí dự kiến</CardTitle>
              <CardDescription>
                Chi phí ước tính cho các thiết bị và vật tư chính.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hạng mục</TableHead>
                    <TableHead className="text-center">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.billOfMaterials.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price}</TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
           <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
           <Skeleton className="h-6 w-1/3" />
           <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent>
           <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
