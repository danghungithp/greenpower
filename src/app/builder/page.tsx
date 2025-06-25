"use client";

import React from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as UiTableFooter,
} from '@/components/ui/table';
import { Loader2, ExternalLink, FileDown } from 'lucide-react';
import { buildSolarSystemAction } from '../actions';
import type { BuildSolarSystemOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const diagramMap = {
  'grid-tie': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Grid-Tied_Solar_Power_System_Diagram.png',
    alt: 'Sơ đồ hệ thống hòa lưới',
    hint: 'grid-tie solar diagram'
  },
  'hybrid': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Solar_panel_system_with_battery_storage_and_grid-connection_V2.svg/1280px-Solar_panel_system_with_battery_storage_and_grid-connection_V2.svg.png',
    alt: 'Sơ đồ hệ thống hybrid',
    hint: 'hybrid solar diagram'
  },
  'off-grid': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Off-grid-home-solar-power-system-diagram.svg/1024px-Off-grid-home-solar-power-system-diagram.svg.png',
    alt: 'Sơ đồ hệ thống độc lập',
    hint: 'off-grid solar diagram'
  },
};

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

type BillOfMaterialsItem = BuildSolarSystemOutput['billOfMaterials'][0];

export default function BuilderPage() {
  const [systemType, setSystemType] = React.useState('grid-tie');
  const [powerCapacity, setPowerCapacity] = React.useState('3');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<BuildSolarSystemOutput | null>(null);
  const [editableBOM, setEditableBOM] = React.useState<BillOfMaterialsItem[] | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setEditableBOM(null);

    const customData = localStorage.getItem(LOCAL_STORAGE_KEY) || '';

    const response = await buildSolarSystemAction({
      systemType,
      powerCapacity: parseFloat(powerCapacity),
      customData,
    });

    setIsLoading(false);
    if ('error' in response) {
      setError(response.error);
    } else {
      setResult(response);
      setEditableBOM(response.billOfMaterials);
    }
  };

  const handleQuantityChange = (index: number, newQuantityStr: string) => {
    if (!editableBOM) return;

    const newQuantity = parseInt(newQuantityStr, 10);
    const newBOM = [...editableBOM];
    const item = newBOM[index];

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      const price = parseFloat(item.price.replace(/[^0-9]/g, ''));
      const newTotal = price * newQuantity;

      newBOM[index] = {
        ...item,
        quantity: newQuantityStr,
        total: new Intl.NumberFormat('vi-VN').format(newTotal) + ' ₫',
      };
      setEditableBOM(newBOM);
    } else if (newQuantityStr === '') {
      newBOM[index] = { ...item, quantity: '' };
      setEditableBOM(newBOM);
    }
  };

  const grandTotal = React.useMemo(() => {
    if (!editableBOM) return 0;
    return editableBOM.reduce((acc, item) => {
      const total = parseFloat(item.total.replace(/[^0-9]/g, ''));
      return acc + (isNaN(total) ? 0 : total);
    }, 0);
  }, [editableBOM]);

  const handleExport = () => {
    if (!editableBOM) return;
    const dataToExport = [
      ...editableBOM.map(item => ({
        'Hạng mục': item.item,
        'Số lượng': item.quantity,
        'Đơn giá': item.price,
        'Tham khảo': item.referenceUrl || '',
        'Thành tiền': item.total,
      })),
      {
        'Hạng mục': 'Tổng cộng',
        'Số lượng': '',
        'Đơn giá': '',
        'Tham khảo': '',
        'Thành tiền': new Intl.NumberFormat('vi-VN').format(grandTotal) + ' ₫',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BaoGiaDienMatTroi');
    XLSX.writeFile(workbook, 'BaoGiaDienMatTroi.xlsx');
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + ' ₫';

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
              <Select value={systemType} onValueChange={setSystemType} disabled={isLoading}>
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
              <Select value={powerCapacity} onValueChange={setPowerCapacity} disabled={isLoading}>
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
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive" role="alert">
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
              <div className="w-full flex justify-center items-center overflow-hidden rounded-lg border bg-background p-4">
                <Image
                  src={diagramMap[systemType as keyof typeof diagramMap].src}
                  alt={diagramMap[systemType as keyof typeof diagramMap].alt}
                  width={800}
                  height={450}
                  data-ai-hint={diagramMap[systemType as keyof typeof diagramMap].hint}
                  className="object-contain"
                />
              </div>
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
                      <TableCell className="font-medium">{spec.component}</TableCell>
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
                Chi phí ước tính cho các thiết bị và vật tư chính. Bạn có thể thay đổi số lượng để tính toán lại.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hạng mục</TableHead>
                    <TableHead className="w-[120px] text-center">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Tham khảo</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editableBOM?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                          className="text-center"
                        />
                      </TableCell>
                      <TableCell className="text-right">{item.price}</TableCell>
                      <TableCell className="text-right">
                        {item.referenceUrl ? (
                          <Link
                            href={item.referenceUrl}
                            target="_blank"
                            className="inline-flex items-center text-sm text-primary underline-offset-4 hover:underline"
                          >
                            Tham khảo thêm
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <UiTableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="font-bold text-right text-base">
                      Tổng cộng
                    </TableCell>
                    <TableCell className="font-bold text-right text-base">
                      {formatCurrency(grandTotal)}
                    </TableCell>
                  </TableRow>
                </UiTableFooter>
              </Table>
            </CardContent>
            <CardFooter className="justify-end gap-2 pt-4">
              <Button onClick={handleExport} disabled={!editableBOM}>
                <FileDown className="mr-2 h-4 w-4" />
                Xuất ra Excel
              </Button>
            </CardFooter>
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
          <Skeleton className="h-[450px] w-full" />
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
