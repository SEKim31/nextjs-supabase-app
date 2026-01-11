"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart3, Home, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";

// 탭 아이템 정의
const tabs = [
  {
    href: "/dashboard",
    icon: Home,
    label: "홈",
  },
  {
    href: "/groups",
    icon: Users,
    label: "그룹",
  },
  {
    href: "/stats",
    icon: BarChart3,
    label: "통계",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "설정",
  },
];

interface BottomTabBarProps {
  className?: string;
}

export function BottomTabBar({ className }: BottomTabBarProps) {
  const pathname = usePathname();

  // 현재 경로가 탭의 href로 시작하는지 확인
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "fill-current")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
