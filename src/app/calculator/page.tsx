
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, LineChart as LineChartIcon, Info, Loader2, ExternalLink, FileDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as UiTableFooter,
} from '@/components/ui/table';
import { buildSolarSystemAction } from '../actions';
import type { BuildSolarSystemOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { SolarSystemDiagram } from '@/components/builder/solar-system-diagram';


const chartConfig = {
    savings: {
        label: 'Lũy kế tiết kiệm',
        color: 'hsl(var(--primary))',
    },
    investment: {
        label: 'Tổng đầu tư',
        color: 'hsl(var(--destructive))',
    },
} satisfies ChartConfig;

const LOCAL_STORAGE_KEY = 'customSolarDataSource';
type BillOfMaterialsItem = BuildSolarSystemOutput['billOfMaterials'][0];

function ResultsSkeleton() {
  return (
    <div className="space-y-8 mt-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
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


export default function CalculatorPage() {
    // State for inputs
    const [cons, setCons] = useState("500");
    const [mode, setMode] = useState('grid');
    const [storage, setStorage] = useState("5");
    const [pricePV, setPricePV] = useState("12000000");
    const [priceStorage, setPriceStorage] = useState("3000000");
    const [effInv, setEffInv] = useState("95");
    const [dod, setDod] = useState("80");
    const [priceElec, setPriceElec] = useState("2300");
    const [incRate, setIncRate] = useState("5");

    // State for results
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);

    // State for builder integration
    const [builderResult, setBuilderResult] = useState<BuildSolarSystemOutput | null>(null);
    const [builderError, setBuilderError] = useState<string | null>(null);
    const [editableBOM, setEditableBOM] = useState<BillOfMaterialsItem[] | null>(null);
    const [diagramReferenceUrl, setDiagramReferenceUrl] = useState<string | null>(null);

    useEffect(() => {
        const customData = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
        if (customData) {
          const lines = customData.split('\n');
          const urlRegex = /(https?:\/\/[^\s]+)/;
          
          const diagramLine = lines.find(line => line.toLowerCase().includes('sơ đồ') || line.toLowerCase().includes('so-do') || line.toLowerCase().includes('diagram'));
          if (diagramLine) {
            const match = diagramLine.match(urlRegex);
            if (match) {
              setDiagramReferenceUrl(match[0]);
              return;
            }
          }
          
          const firstLineWithUrl = lines.find(line => urlRegex.test(line));
          if (firstLineWithUrl) {
              const match = firstLineWithUrl.match(urlRegex);
              if (match) {
                  setDiagramReferenceUrl(match[0]);
              }
          }
        }
    }, []);

    const handleCalculate = async () => {
        setIsLoading(true);
        setResults(null);
        setBuilderResult(null);
        setEditableBOM(null);
        setBuilderError(null);
        setChartData([]);

        const numCons = parseFloat(cons);
        const numStorage = parseFloat(storage);
        const numPricePV = parseFloat(pricePV);
        const numPriceStorage = parseFloat(priceStorage);
        const numEffInv = parseFloat(effInv);
        const numPriceElec = parseFloat(priceElec);
        const numIncRate = parseFloat(incRate);

        if (!numCons || (mode !== 'grid' && (!numStorage || numStorage <= 0))) {
            alert('Vui lòng nhập đầy đủ.');
            setIsLoading(false);
            return;
        }

        const loss = 1 / (numEffInv / 100);
        const daily = (numCons * 12) / 365 * loss;
        const sun = 4.5;
        const pvKw = daily / sun;

        const costPV = pvKw * numPricePV;
        const costStorage = mode === 'grid' ? 0 : numStorage * numPriceStorage;
        const capInvest = costPV + costStorage;

        const monthlySave = numCons * numPriceElec;
        const annualSaveYear1 = monthlySave * 12;
        let payback = 0;
        let cumSave = 0;
        let cumulativeSavingsData = [];

        while (cumSave < capInvest) {
            const currentYearSave = annualSaveYear1 * Math.pow(1 + numIncRate / 100, payback);
            cumSave += currentYearSave;
             cumulativeSavingsData.push({
                name: `Năm ${payback}`,
                savings: Math.round(cumSave),
                investment: Math.round(capInvest),
            });
            payback++;
            if (payback > 50) { 
                payback = -1;
                break;
            }
        }
        
        const finalPayback = payback;

        if(finalPayback !== -1) {
            for (let i = 1; i <= 5; i++) {
                const yearIndex = finalPayback -1 + i;
                const currentYearSave = annualSaveYear1 * Math.pow(1 + numIncRate / 100, yearIndex);
                cumSave += currentYearSave;
                cumulativeSavingsData.push({
                    name: `Năm ${yearIndex}`,
                    savings: Math.round(cumSave),
                    investment: Math.round(capInvest),
                });
            }
        }
        
        setResults({
            pvKw,
            costPV,
            costStorage,
            capInvest,
            annualSaveYear1,
            payback: finalPayback,
        });
        setChartData(cumulativeSavingsData);

        // --- Builder Integration ---
        const systemTypeMap: { [key: string]: 'grid-tie' | 'hybrid' | 'off-grid' } = {
            grid: 'grid-tie',
            hybrid: 'hybrid',
            offgrid: 'off-grid'
        };

        const customData = localStorage.getItem(LOCAL_STORAGE_KEY) || '';

        const response = await buildSolarSystemAction({
            systemType: systemTypeMap[mode],
            powerCapacity: parseFloat(pvKw.toFixed(2)),
            customData,
        });

        setIsLoading(false);
        if ('error' in response) {
            setBuilderError(response.error);
        } else {
            setBuilderResult(response);
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

    const grandTotal = useMemo(() => {
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
    const mappedSystemType = mode === 'grid' ? 'grid-tie' : (mode === 'offgrid' ? 'off-grid' : 'hybrid');

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Công cụ tính toán & Xây dựng hệ thống
            </h1>
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Về Độ Chính Xác Của Công Cụ</AlertTitle>
                <AlertDescription>
                    <p className="mb-2">
                        Công cụ này cung cấp một <strong>ước tính ban đầu</strong> để bạn tham khảo. Các công thức được xây dựng dựa trên tiêu chuẩn ngành nhưng có một số giả định để đơn giản hóa:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Số giờ nắng:</strong> Giả định cố định là 4.5 giờ/ngày. Con số này có thể thay đổi tùy thuộc vào vị trí địa lý và thời gian trong năm.</li>
                        <li><strong>Hiệu quả hệ thống:</strong> Kết quả tính toán phụ thuộc hoàn toàn vào các thông số đầu vào do bạn cung cấp.</li>
                    </ul>
                    <p className="mt-2 font-medium">
                       <strong>Lưu ý quan trọng:</strong> Thông số <strong>"DOD pin (%)" (Độ xả sâu)</strong> hiện chưa được áp dụng vào công thức tính. Điều này ảnh hưởng đến độ chính xác của kết quả, đặc biệt là với hệ thống Hybrid và Off-grid.
                    </p>
                </AlertDescription>
            </Alert>
             <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Hướng dẫn sử dụng</AlertTitle>
                <AlertDescription>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>Nhập tiêu thụ điện trung bình hàng tháng (kWh).</li>
                        <li>Chọn mô hình: hòa lưới, hybrid, hoặc off-grid.</li>
                        <li>Nếu chọn hybrid hoặc off-grid, nhập dung lượng pin lưu trữ (kWh).</li>
                        <li>Điều chỉnh các thông số chi tiết như đơn giá, hiệu suất nếu cần.</li>
                        <li>Nhấn "Tính toán & Xây dựng hệ thống" để xem chi phí đầu tư, tiền tiết kiệm, thời gian hoàn vốn, và bảng vật tư chi tiết.</li>
                    </ol>
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader>
                    <CardTitle>Thông số đầu vào</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="cons">Tiêu thụ điện (kWh/tháng)</Label>
                        <Input id="cons" type="number" value={cons} onChange={(e) => setCons(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Hóa đơn tiền điện hàng tháng của bạn cho biết chỉ số này.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="mode">Mô hình</Label>
                        <Select value={mode} onValueChange={setMode} disabled={isLoading}>
                            <SelectTrigger id="mode">
                                <SelectValue placeholder="Chọn mô hình" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="grid">Hòa lưới (grid)</SelectItem>
                                <SelectItem value="hybrid">Hybrid (hòa lưới + pin)</SelectItem>
                                <SelectItem value="offgrid">Off-grid (độc lập)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground pt-1">Chọn mô hình hệ thống phù hợp với nhu cầu của bạn.</p>
                    </div>
                    {mode !== 'grid' && (
                         <div className="space-y-2">
                            <Label htmlFor="storage">Dung lượng pin (kWh)</Label>
                            <Input id="storage" type="number" value={storage} onChange={(e) => setStorage(e.target.value)} disabled={isLoading}/>
                             <p className="text-sm text-muted-foreground pt-1">Tổng dung lượng lưu trữ của hệ thống pin, ảnh hưởng đến khả năng hoạt động khi mất điện.</p>
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="pricePV">Giá PV (₫/kWp)</Label>
                        <Input id="pricePV" type="number" value={pricePV} onChange={(e) => setPricePV(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Chi phí đầu tư cho mỗi kilowatt-peak (kWp) tấm pin mặt trời.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="priceStorage">Giá pin (₫/kWh)</Label>
                        <Input id="priceStorage" type="number" value={priceStorage} onChange={(e) => setPriceStorage(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Chi phí đầu tư cho mỗi kilowatt-giờ (kWh) dung lượng pin lưu trữ.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="effInv">Hiệu suất inverter (%)</Label>
                        <Input id="effInv" type="number" value={effInv} onChange={(e) => setEffInv(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Tỷ lệ điện DC từ pin được chuyển đổi thành điện AC để sử dụng, thường từ 95-98%.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="dod">DOD pin (%)</Label>
                        <Input id="dod" type="number" value={dod} onChange={(e) => setDod(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Độ xả sâu (Depth of Discharge) - Tỷ lệ phần trăm dung lượng pin được sử dụng.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="priceElec">Giá điện hiện tại (₫/kWh)</Label>
                        <Input id="priceElec" type="number" value={priceElec} onChange={(e) => setPriceElec(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Chi phí bạn đang trả cho mỗi kWh điện từ lưới điện quốc gia.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="incRate">Tăng giá điện hàng năm (%)</Label>
                        <Input id="incRate" type="number" value={incRate} onChange={(e) => setIncRate(e.target.value)} disabled={isLoading}/>
                        <p className="text-sm text-muted-foreground pt-1">Tỷ lệ dự kiến giá điện sẽ tăng mỗi năm, ảnh hưởng đến tính toán tiết kiệm dài hạn.</p>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={handleCalculate} className="w-full md:w-auto" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tính toán & Xây dựng hệ thống
            </Button>

            {results && !isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Kết quả phân tích đầu tư</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 text-base">
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">Chi tiết đầu tư</h3>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>Công suất PV: <span className="font-medium text-foreground">{results.pvKw.toFixed(2)} kWp</span></li>
                                    <li>Chi phí PV: <span className="font-medium text-foreground">{formatCurrency(results.costPV)}</span></li>
                                    {mode !== 'grid' && <li>Chi phí pin: <span className="font-medium text-foreground">{formatCurrency(results.costStorage)}</span></li>}
                                    <li className="text-lg">Tổng đầu tư: <span className="font-bold text-primary">{formatCurrency(results.capInvest)}</span></li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-card p-4 shadow-sm">
                                <h3 className="text-lg font-semibold mb-2">Hiệu quả kinh tế</h3>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>Tiết kiệm năm đầu: <span className="font-medium text-foreground">{formatCurrency(results.annualSaveYear1)}</span></li>
                                    <li className="text-lg">Thời gian hoàn vốn: <span className="font-bold text-primary">{results.payback !== -1 ? `${results.payback} năm` : '> 50 năm'}</span></li>
                                </ul>
                            </div>
                        </div>

                        <ChartContainer config={chartConfig} className="w-full h-[300px]">
                            <ResponsiveContainer>
                                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
                                    <Tooltip
                                        content={<ChartTooltipContent 
                                            indicator='dot'
                                            formatter={(value, name) => (
                                              <div className="flex flex-col">
                                                  <span className="text-xs text-muted-foreground">{name === 'savings' ? 'Tiết kiệm' : 'Đầu tư'}</span>
                                                  <span className="font-bold">{formatCurrency(value as number)}</span>
                                              </div>
                                            )}
                                        />}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="savings" stroke="var(--color-savings)" strokeWidth={2} name="Lũy kế tiết kiệm" dot={false} />
                                    <Line type="monotone" dataKey="investment" stroke="var(--color-investment)" strokeWidth={2} strokeDasharray="5 5" name="Tổng đầu tư" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>

                    </CardContent>
                </Card>
            )}

            {isLoading && <ResultsSkeleton />}
            
            {builderError && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive" role="alert">
                    <p className="font-semibold">Đã xảy ra lỗi khi xây dựng hệ thống</p>
                    <p>{builderError}</p>
                </div>
            )}

            {builderResult && !isLoading && (
                <div className="space-y-8 mt-8">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
                        Chi tiết hệ thống được đề xuất
                    </h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Sơ đồ đấu nối hệ thống</CardTitle>
                      <CardDescription>
                        Sơ đồ nguyên lý các thành phần chính trong hệ thống của bạn.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SolarSystemDiagram systemType={mappedSystemType} />
                    </CardContent>
                    {diagramReferenceUrl && (
                      <CardFooter>
                         <Button asChild variant="outline">
                            <Link href={diagramReferenceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Tham khảo thêm
                            </Link>
                          </Button>
                      </CardFooter>
                    )}
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
                            <TableHead className="text-right">Tham khảo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {builderResult.specifications.map((spec, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{spec.component}</TableCell>
                              <TableCell>{spec.details}</TableCell>
                              <TableCell className="text-right">
                                {spec.referenceUrl ? (
                                  <Link
                                    href={spec.referenceUrl}
                                    target="_blank"
                                    className="inline-flex items-center text-sm text-primary underline-offset-4 hover:underline"
                                  >
                                    Xem chi tiết
                                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                                  </Link>
                                ) : (
                                  '-'
                                )}
                              </TableCell>
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
