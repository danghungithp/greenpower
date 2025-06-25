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
import { useAuth } from '@/context/auth-context';

const navItems = [
  { href: '/', label: 'AI Hỗ trợ', icon: BotMessageSquare },
  { href: '/builder', label: 'Xây dựng Hệ thống', icon: Construction },
  { href: '/posts', label: 'Bài viết', icon: FileText },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/calculator', label: 'Công cụ tính toán', icon: Calculator },
  { href: '/products', label: 'Sản phẩm', icon: Package },
];

const adminNavItem = { href: '/admin', label: 'Quản trị', icon: Shield };

export function Nav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

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
      {isAuthenticated && (
         <SidebarMenuItem key={adminNavItem.href}>
         <SidebarMenuButton
           asChild
           isActive={pathname === adminNavItem.href}
           tooltip={adminNavItem.label}
         >
           <Link href={adminNavItem.href}>
             <adminNavItem.icon />
             <span>{adminNavItem.label}</span>
           </Link>
         </SidebarMenuButton>
       </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
