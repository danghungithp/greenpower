
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, LineChart as LineChartIcon, Info } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

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
    const [results, setResults] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);

    const handleCalculate = () => {
        const numCons = parseFloat(cons);
        const numStorage = parseFloat(storage);
        const numPricePV = parseFloat(pricePV);
        const numPriceStorage = parseFloat(priceStorage);
        const numEffInv = parseFloat(effInv);
        const numPriceElec = parseFloat(priceElec);
        const numIncRate = parseFloat(incRate);

        if (!numCons || (mode !== 'grid' && (!numStorage || numStorage <= 0))) {
            alert('Vui lòng nhập đầy đủ.');
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
                payback = -1; // Indicate it won't pay back
                break;
            }
        }
        
        const finalPayback = payback;

        // Add 5 more years to the chart for projection
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
    };

    const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + ' ₫';

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Công cụ tính toán đầu tư điện mặt trời
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
                        <li>Nhấn "Tính toán" để xem chi phí đầu tư, tiền tiết kiệm và thời gian hoàn vốn.</li>
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
                        <Input id="cons" type="number" value={cons} onChange={(e) => setCons(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Hóa đơn tiền điện hàng tháng của bạn cho biết chỉ số này.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="mode">Mô hình</Label>
                        <Select value={mode} onValueChange={setMode}>
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
                            <Input id="storage" type="number" value={storage} onChange={(e) => setStorage(e.target.value)} />
                             <p className="text-sm text-muted-foreground pt-1">Tổng dung lượng lưu trữ của hệ thống pin, ảnh hưởng đến khả năng hoạt động khi mất điện.</p>
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="pricePV">Giá PV (₫/kWp)</Label>
                        <Input id="pricePV" type="number" value={pricePV} onChange={(e) => setPricePV(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Chi phí đầu tư cho mỗi kilowatt-peak (kWp) tấm pin mặt trời.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="priceStorage">Giá pin (₫/kWh)</Label>
                        <Input id="priceStorage" type="number" value={priceStorage} onChange={(e) => setPriceStorage(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Chi phí đầu tư cho mỗi kilowatt-giờ (kWh) dung lượng pin lưu trữ.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="effInv">Hiệu suất inverter (%)</Label>
                        <Input id="effInv" type="number" value={effInv} onChange={(e) => setEffInv(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Tỷ lệ điện DC từ pin được chuyển đổi thành điện AC để sử dụng, thường từ 95-98%.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="dod">DOD pin (%)</Label>
                        <Input id="dod" type="number" value={dod} onChange={(e) => setDod(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Độ xả sâu (Depth of Discharge) - Tỷ lệ phần trăm dung lượng pin được sử dụng.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="priceElec">Giá điện hiện tại (₫/kWh)</Label>
                        <Input id="priceElec" type="number" value={priceElec} onChange={(e) => setPriceElec(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Chi phí bạn đang trả cho mỗi kWh điện từ lưới điện quốc gia.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="incRate">Tăng giá điện hàng năm (%)</Label>
                        <Input id="incRate" type="number" value={incRate} onChange={(e) => setIncRate(e.target.value)} />
                        <p className="text-sm text-muted-foreground pt-1">Tỷ lệ dự kiến giá điện sẽ tăng mỗi năm, ảnh hưởng đến tính toán tiết kiệm dài hạn.</p>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={handleCalculate} className="w-full md:w-auto">
                Tính toán
            </Button>

            {results && (
                <Card>
                    <CardHeader>
                        <CardTitle>Kết quả phân tích</CardTitle>
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
        </div>
    );
}
