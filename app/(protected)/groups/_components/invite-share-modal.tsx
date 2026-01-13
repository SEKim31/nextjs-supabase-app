"use client";

import { useState } from "react";

import { Check, Copy, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getMockInviteForGroup } from "@/lib/mocks/groups";

interface InviteShareModalProps {
  /** 그룹 ID */
  groupId: string;
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 열림 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
}

/**
 * InviteShareModal - 그룹 초대 링크 공유 모달
 * 초대 링크를 생성하고 복사/공유하는 기능 제공
 */
export function InviteShareModal({
  groupId,
  isOpen,
  onOpenChange,
}: InviteShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  // 초대 링크 생성
  const invite = getMockInviteForGroup(groupId);
  const inviteUrl = invite
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${invite.token}`
    : "";

  // 복사 기능
  const handleCopy = async () => {
    if (!inviteUrl) return;

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);

      // 2초 후 복사 상태 초기화
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("링크 복사 실패:", error);
    }
  };

  // Web Share API 지원 여부 확인
  const isShareSupported =
    typeof navigator !== "undefined" && "share" in navigator;

  // 공유 기능
  const handleShare = async () => {
    if (!inviteUrl || !isShareSupported) return;

    try {
      await navigator.share({
        title: "그룹 초대",
        text: "함께 습관을 만들어요! 그룹에 초대합니다.",
        url: inviteUrl,
      });
    } catch (error) {
      // 사용자가 공유를 취소한 경우 에러가 발생할 수 있음
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        error.name !== "NotAllowedError"
      ) {
        console.error("링크 공유 실패:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>그룹 초대하기</DialogTitle>
          <DialogDescription>
            링크를 공유하여 그룹에 초대하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 초대 링크 입력 필드 */}
          <div className="flex items-center gap-2">
            <Input
              value={inviteUrl}
              readOnly
              className="flex-1 text-sm"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isCopied ? "복사됨" : "복사하기"}
              </span>
            </Button>
          </div>

          {/* 공유 버튼 (Web Share API 지원 시에만 표시) */}
          {isShareSupported && (
            <Button onClick={handleShare} className="w-full gap-2">
              <Share2 className="h-4 w-4" />
              공유하기
            </Button>
          )}

          {/* 만료 안내 텍스트 */}
          <p className="text-muted-foreground text-center text-sm">
            이 링크는 7일 후 만료됩니다
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
