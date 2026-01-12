"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart3, Home, Settings, ShieldCheck, Users } from "lucide-react";

import { TAB_BAR_HEIGHT } from "@/lib/constants/layout";
import { cn } from "@/lib/utils";

// 탭 아이템 정의
const tabs = [
  {
    href: "/dashboard",
    icon: Home,
    label: "홈",
    emphasis: false,
  },
  {
    href: "/groups",
    icon: Users,
    label: "그룹",
    emphasis: false,
  },
  {
    href: "/certifications",
    icon: ShieldCheck,
    label: "인증",
    emphasis: true, // 강조 스타일
  },
  {
    href: "/stats",
    icon: BarChart3,
    label: "통계",
    emphasis: false,
  },
  {
    href: "/settings",
    icon: Settings,
    label: "설정",
    emphasis: false,
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
        // Safe Area 대응: 하단 여백 추가 (iOS 홈바 등)
        "pb-safe",
        className
      )}
      style={{ height: TAB_BAR_HEIGHT }}
      aria-label="하단 탭 메뉴"
    >
      <div className="mx-auto flex h-full max-w-lg items-center justify-around px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                // 기본 스타일
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
                // 강조 탭 스타일 (인증 탭)
                tab.emphasis && [
                  "relative",
                  active && "text-brand-primary",
                  !active && "text-brand-primary/70 hover:text-brand-primary",
                ]
              )}
            >
              {/* 강조 탭에는 배경 원형 추가 */}
              {tab.emphasis && active && (
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-brand-primary/10" />
                </div>
              )}
              <Icon
                className={cn(
                  "h-5 w-5",
                  active && "fill-current",
                  tab.emphasis && "h-6 w-6"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  tab.emphasis && "font-semibold"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
