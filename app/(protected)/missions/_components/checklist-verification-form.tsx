"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * 체크리스트 아이템 타입
 */
interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistVerificationFormProps {
  /** 미션의 기본 체크리스트 항목들 */
  defaultItems: Array<{ id: string; label: string }>;
  /** 폼 제출 핸들러 */
  onSubmit: (items: ChecklistItem[]) => void | Promise<void>;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * ChecklistVerificationForm - 체크리스트 인증 폼 컴포넌트
 * 미션의 체크리스트 항목들을 완료 여부 토글
 */
export function ChecklistVerificationForm({
  defaultItems,
  onSubmit,
  isLoading = false,
  className,
}: ChecklistVerificationFormProps) {
  // 체크리스트 상태 초기화 (모두 미체크 상태로 시작)
  const [items, setItems] = useState<ChecklistItem[]>(
    defaultItems.map((item) => ({
      ...item,
      checked: false,
    }))
  );

  // 체크박스 토글 핸들러
  const handleToggle = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 완료된 항목 개수 계산
  const completedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 최소 1개 이상 체크되어야 함
    if (completedCount === 0) {
      alert("최소 1개 이상의 항목을 완료해주세요.");
      return;
    }

    onSubmit(items);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>체크리스트</Label>
          <span className="text-xs text-muted-foreground">
            {completedCount}/{totalCount} 완료
          </span>
        </div>

        {/* 체크리스트 항목들 */}
        <div className="space-y-2 rounded-lg border p-4">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              체크리스트 항목이 없습니다.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent",
                  isLoading && "pointer-events-none opacity-50"
                )}
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleToggle(item.id)}
                  disabled={isLoading}
                  className={cn(
                    item.checked && "data-[state=checked]:bg-brand-primary"
                  )}
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={cn(
                    "flex-1 cursor-pointer text-sm transition-colors",
                    item.checked
                      ? "text-foreground"
                      : "text-muted-foreground line-through"
                  )}
                >
                  {item.label}
                </label>
                {item.checked && (
                  <Check className="h-4 w-4 text-brand-primary" />
                )}
              </div>
            ))
          )}
        </div>

        {/* 안내 메시지 */}
        {items.length > 0 && (
          <p className="text-xs text-muted-foreground">
            오늘 완료한 항목을 체크해주세요. 모든 항목을 완료하지 않아도 인증할
            수 있습니다.
          </p>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        className="w-full"
        disabled={completedCount === 0 || isLoading}
      >
        {isLoading ? "제출 중..." : `인증하기 (${completedCount}개 완료)`}
      </Button>
    </form>
  );
}
