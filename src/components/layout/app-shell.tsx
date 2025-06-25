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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
