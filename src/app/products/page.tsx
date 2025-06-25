"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExternalLink, Lightbulb, Loader2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'customSolarDataSource';

type Product = {
  name: string;
  price?: string;
  url?: string;
  imageUrl: string;
  dataAiHint: string;
};

// Simple keyword-based AI hint generation for images
const getAiHint = (name: string): string => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('pin') && !lowerCaseName.includes('inverter')) return 'solar panel';
    if (lowerCaseName.includes('inverter')) return 'inverter';
    if (lowerCaseName.includes('lưu trữ') || lowerCaseName.includes('battery')) return 'battery';
    if (lowerCaseName.includes('tủ điện') || lowerCaseName.includes('breaker')) return 'electrical box';
    return 'solar equipment';
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const lines = savedData.split('\n').filter(line => line.trim() !== '');
      
      const parsedProducts = lines.map((line, index) => {
        let name = line.trim();
        let price: string | undefined;
        let url: string | undefined;

        // Extract URL first
        const urlRegex = /(https?:\/\/[^\s]+)/;
        const urlMatch = name.match(urlRegex);
        if (urlMatch) {
          url = urlMatch[0];
          name = name.replace(url, '').trim();
        }

        // Extract Price
        const priceRegex = /(?:-?\s*Giá:\s*)([\d.,]+\s*₫)/i;
        const priceMatch = name.match(priceRegex);
        if (priceMatch) {
          price = priceMatch[1];
          name = name.replace(priceRegex, '').trim();
        }
        
        // Clean up name from separators
        name = name.replace(/^-/, '').replace(/-$/, '').trim();

        // If name is empty but URL exists, use a fallback
        if (!name && url) {
            try {
                const urlObj = new URL(url);
                const path = urlObj.pathname.length > 1 ? urlObj.pathname.replace(/\//g, ' ') : '';
                name = (urlObj.hostname + path).replace('www.','');
            } catch (e) {
                name = "Sản phẩm không có tên";
            }
        }

        const dataAiHint = getAiHint(name);
        // "solar panel" -> "solar,panel" to use as keywords for Unsplash
        const keywords = dataAiHint.replace(/\s+/g, ','); 
        // Add a random parameter based on index to get a stable unique image per product
        const imageUrl = `https://source.unsplash.com/600x400/?${keywords}&random=${index}`;

        return {
          name: name || "Sản phẩm chưa đặt tên",
          price,
          url,
          imageUrl: imageUrl,
          dataAiHint: dataAiHint,
        };
      }).filter(p => p.name && p.name !== "Sản phẩm không có tên");

      setProducts(parsedProducts);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Danh mục Sản phẩm
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Các sản phẩm và vật tư được lấy từ nguồn dữ liệu tùy chỉnh của bạn.
        </p>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && products.length === 0 && (
         <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Chưa có sản phẩm nào</AlertTitle>
            <AlertDescription>
                <p>Nguồn dữ liệu sản phẩm của bạn đang trống. Vui lòng đi đến trang Quản trị để thêm các URL hoặc thông tin sản phẩm.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin">Đi đến trang Quản trị</Link>
                </Button>
            </AlertDescription>
        </Alert>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="flex flex-col overflow-hidden">
                <div className="relative aspect-[3/2] w-full bg-muted">
                    <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill
                        className="object-cover"
                        data-ai-hint={product.dataAiHint}
                    />
                </div>
              <CardHeader>
                <CardTitle className="text-base h-12 line-clamp-2">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {product.price ? (
                    <p className="text-lg font-semibold text-primary">{product.price}</p>
                ) : (
                    <p className="text-sm text-muted-foreground">Chưa có giá</p>
                )}
              </CardContent>
              <CardFooter>
                {product.url ? (
                  <Button asChild className="w-full">
                    <Link href={product.url} target="_blank" rel="noopener noreferrer">
                      Xem chi tiết
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                    <Button disabled className="w-full">Không có liên kết</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
