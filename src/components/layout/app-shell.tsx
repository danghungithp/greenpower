'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Nav } from '@/components/layout/nav';
import { LogOut, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, isLoading } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible={'icon'}
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 p-1">
              <Button variant="ghost" size="icon" className="shrink-0 text-primary hover:bg-primary/10">
                <Zap className="size-5" />
              </Button>
              <h1 className="text-lg font-semibold tracking-tight font-headline">
                GreenPower
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <Nav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
            <SidebarTrigger className="sm:hidden" />

            <div className="flex-1">
              {/* Could be used for breadcrumbs */}
            </div>

            <div className="relative flex-1 md:grow-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>

            {isLoading ? (
              <Skeleton className="h-10 w-28 rounded-md" />
            ) : isAuthenticated ? (
              <Button onClick={logout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          <footer className="w-full border-t bg-background text-xs text-muted-foreground py-6 px-4 mt-8">
            <div className="max-w-7xl mx-auto">
              <div className="font-semibold mb-2">Từ khóa nổi bật:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại An Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bà Rịa - Vũng Tàu',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Kạn',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bạc Liêu',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bắc Ninh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bến Tre',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Định',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Dương',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Phước',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Bình Thuận',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Cà Mau',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Cần Thơ',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Cao Bằng',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Đà Nẵng',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Đắk Lắk',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Đắk Nông',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Điện Biên',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Đồng Nai',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Đồng Tháp',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Gia Lai',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Nam',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Nội',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hà Tĩnh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hải Dương',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hải Phòng',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hậu Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hòa Bình',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Hưng Yên',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Khánh Hòa',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Kiên Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Kon Tum',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Lai Châu',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Lâm Đồng',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Lạng Sơn',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Lào Cai',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Long An',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Nam Định',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Nghệ An',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Ninh Bình',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Ninh Thuận',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Phú Thọ',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Phú Yên',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Bình',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Nam',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Ngãi',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Ninh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Quảng Trị',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Sóc Trăng',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Sơn La',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Tây Ninh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Thái Bình',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Thái Nguyên',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Thanh Hóa',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Thừa Thiên Huế',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Tiền Giang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại TP Hồ Chí Minh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Trà Vinh',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Tuyên Quang',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Vĩnh Long',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Vĩnh Phúc',
                  'lắp đặt hệ thống điện mặt trời giá rẻ tại Yên Bái',
                ].map((kw, i) => (
                  <span key={i} className="inline-block bg-muted px-2 py-1 rounded mb-1">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
