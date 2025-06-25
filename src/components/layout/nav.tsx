'use client';

import React from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  BotMessageSquare,
  FileText,
  Video,
  Calculator,
  Package,
  Shield,
  Construction,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'AI Hỗ trợ', icon: BotMessageSquare },
  { href: '/builder', label: 'Xây dựng Hệ thống', icon: Construction },
  { href: '/admin', label: 'Quản trị', icon: Shield },
  { href: '/posts', label: 'Bài viết', icon: FileText },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/calculator', label: 'Công cụ tính toán', icon: Calculator },
  { href: '/products', label: 'Sản phẩm', icon: Package },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
