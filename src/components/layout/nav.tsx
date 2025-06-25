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
  File,
  Menu as MenuIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'AI Hỗ trợ', icon: BotMessageSquare },
  { href: '/posts', label: 'Bài viết', icon: FileText },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/calculator', label: 'Công cụ tính toán', icon: Calculator },
  { href: '/products', label: 'Sản phẩm', icon: Package },
  { href: '/pages', label: 'Trang', icon: File },
  { href: '/menu', label: 'Menu', icon: MenuIcon },
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
