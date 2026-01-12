"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextVerificationFormProps {
  /** 폼 제출 핸들러 */
  onSubmit: (textContent: string) => void | Promise<void>;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

const MAX_CHARACTERS = 1000;

/**
 * TextVerificationForm - 텍스트 인증 폼 컴포넌트
 * 텍스트 입력 및 글자 수 제한 기능 제공
 */
export function TextVerificationForm({
  onSubmit,
  isLoading = false,
  className,
}: TextVerificationFormProps) {
  const [textContent, setTextContent] = useState("");

  // 남은 글자 수 계산
  const remainingCharacters = MAX_CHARACTERS - textContent.length;

  // 텍스트 변경 핸들러
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    // 최대 글자 수 제한
    if (value.length <= MAX_CHARACTERS) {
      setTextContent(value);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = textContent.trim();

    if (!trimmedContent) {
      alert("인증 내용을 입력해주세요.");
      return;
    }

    if (trimmedContent.length > MAX_CHARACTERS) {
      alert(`인증 내용은 ${MAX_CHARACTERS}자 이하여야 합니다.`);
      return;
    }

    onSubmit(trimmedContent);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="verification-text">인증 내용</Label>
          <span
            className={cn(
              "text-xs",
              remainingCharacters < 100
                ? "font-semibold text-destructive"
                : "text-muted-foreground"
            )}
          >
            {remainingCharacters}자 남음
          </span>
        </div>

        <Textarea
          id="verification-text"
          placeholder="오늘의 미션을 어떻게 수행했는지 자세히 적어주세요. (예: 30분 동안 조깅했어요!)"
          value={textContent}
          onChange={handleTextChange}
          disabled={isLoading}
          className="min-h-[200px] resize-none"
          maxLength={MAX_CHARACTERS}
        />

        <p className="text-xs text-muted-foreground">
          미션 수행 내용을 자세히 작성하면 다른 사람들에게 더 많은 응원을 받을
          수 있어요!
        </p>
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        className="w-full"
        disabled={!textContent.trim() || isLoading}
      >
        {isLoading ? "제출 중..." : "인증하기"}
      </Button>
    </form>
  );
}
