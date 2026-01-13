"use client";

import Image from "next/image";

import { Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  VerificationWithCheers,
  VerificationWithUser,
} from "@/lib/types/database";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils/date";

import { CheerButton } from "./cheer-button";

interface VerificationFeedProps {
  /** 인증 데이터 (사용자 정보 및 응원 정보 포함) */
  verification: VerificationWithUser & VerificationWithCheers;
  /** 현재 로그인한 사용자 ID */
  currentUserId: string;
  /** 응원하기 버튼 클릭 핸들러 */
  onCheer: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * VerificationFeed - 인증 피드 컴포넌트
 * 사용자의 인증 내용을 피드 형태로 표시
 */
export function VerificationFeed({
  verification,
  currentUserId,
  onCheer,
  className,
}: VerificationFeedProps) {
  // 현재 사용자가 응원했는지 확인
  const isCheerActive = verification.cheers.some(
    (cheer) => cheer.user_id === currentUserId
  );

  // 사용자 닉네임 또는 이메일 표시
  const displayName =
    verification.user.nickname || verification.user.email.split("@")[0];

  // 아바타 폴백 (닉네임 또는 이메일의 첫 글자)
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={verification.user.profile_image_url || undefined}
              alt={displayName}
            />
            <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-muted-foreground text-xs">
              {formatRelativeTime(verification.verified_at)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* 사진 인증 */}
        {verification.image_url && (
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={verification.image_url}
              alt="인증 사진"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* 텍스트 인증 */}
        {verification.text_content && (
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm whitespace-pre-wrap">
              {verification.text_content}
            </p>
          </div>
        )}

        {/* 체크리스트 인증 */}
        {verification.checklist_items &&
          verification.checklist_items.length > 0 && (
            <div className="space-y-2">
              {verification.checklist_items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={item.checked}
                    disabled
                    className={cn(
                      item.checked && "data-[state=checked]:bg-brand-primary"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      item.checked
                        ? "text-foreground"
                        : "text-muted-foreground line-through"
                    )}
                  >
                    {item.label}
                  </span>
                  {item.checked && (
                    <Check className="text-brand-primary ml-auto h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          )}
      </CardContent>

      <CardFooter className="border-t pt-3">
        <CheerButton
          count={verification.cheer_count}
          isActive={isCheerActive}
          onCheer={onCheer}
          size="sm"
        />
      </CardFooter>
    </Card>
  );
}
