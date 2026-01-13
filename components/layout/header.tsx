"use client";

import Link from "next/link";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b bg-background px-4",
        className
      )}
    >
      {/* 로고 */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">하루모아</span>
      </Link>

      {/* 알림 아이콘 */}
      <Button variant="ghost" size="icon" className="relative" asChild>
        <Link href="/settings/notifications">
          <Bell className="h-5 w-5" />
          <span className="sr-only">알림</span>
        </Link>
      </Button>
    </header>
  );
}
