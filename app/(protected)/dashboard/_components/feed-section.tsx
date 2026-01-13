"use client";

import Image from "next/image";

import { Heart, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeedItem {
  /** 피드 ID */
  id: string;
  /** 사용자 닉네임 */
  userName: string;
  /** 사용자 프로필 이미지 URL */
  userAvatar?: string;
  /** 미션 제목 */
  missionTitle: string;
  /** 인증 시간 (상대 시간 표시용, 예: "10분 전") */
  timeAgo: string;
  /** 인증 타입 */
  verificationType: "photo" | "text" | "check";
  /** 인증 사진 URL (사진 타입인 경우) */
  photoUrl?: string;
  /** 인증 텍스트 (텍스트 타입인 경우) */
  text?: string;
  /** 응원 수 */
  cheerCount: number;
  /** 현재 사용자가 응원했는지 여부 */
  isCheered: boolean;
}

interface FeedSectionProps {
  /** 피드 아이템 목록 */
  feeds: FeedItem[];
  /** 응원 버튼 클릭 핸들러 */
  onCheer?: (feedId: string) => void;
  /** 로딩 상태 */
  isLoading?: boolean;
}

/**
 * 피드 아이템 카드 컴포넌트
 */
function FeedCard({
  feed,
  onCheer,
}: {
  feed: FeedItem;
  onCheer?: (feedId: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={feed.userAvatar} alt={feed.userName} />
              <AvatarFallback>{feed.userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm leading-none font-medium">
                {feed.userName}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {feed.timeAgo}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {feed.missionTitle}
          </Badge>
          {feed.verificationType === "photo" && (
            <span className="text-muted-foreground text-xs">📷 사진 인증</span>
          )}
          {feed.verificationType === "text" && (
            <span className="text-muted-foreground text-xs">
              ✍️ 텍스트 인증
            </span>
          )}
          {feed.verificationType === "check" && (
            <span className="text-muted-foreground text-xs">✅ 완료 인증</span>
          )}
        </div>

        {/* 사진 인증인 경우 이미지 표시 */}
        {feed.verificationType === "photo" && feed.photoUrl && (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={feed.photoUrl}
              alt="인증 사진"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* 텍스트 인증인 경우 텍스트 표시 */}
        {feed.verificationType === "text" && feed.text && (
          <p className="text-sm">{feed.text}</p>
        )}

        {/* 응원 버튼 */}
        <div className="flex items-center gap-2">
          <Button
            variant={feed.isCheered ? "default" : "outline"}
            size="sm"
            onClick={() => onCheer?.(feed.id)}
            className="gap-1"
          >
            <Heart
              className={`h-4 w-4 ${feed.isCheered ? "fill-current" : ""}`}
            />
            최고야!
            {feed.cheerCount > 0 && (
              <span className="ml-1">({feed.cheerCount})</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 로딩 스켈레톤 컴포넌트
 */
function FeedSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
          <div className="space-y-2">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="bg-muted h-3 w-16 animate-pulse rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        <div className="bg-muted aspect-square w-full animate-pulse rounded-lg" />
        <div className="bg-muted h-8 w-24 animate-pulse rounded" />
      </CardContent>
    </Card>
  );
}

/**
 * 피드/활동 섹션 컴포넌트
 * 그룹원들의 최근 인증 활동을 표시합니다.
 */
export function FeedSection({ feeds, onCheer, isLoading }: FeedSectionProps) {
  // 로딩 중
  if (isLoading) {
    return (
      <div className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold">최근 활동</h2>
          <p className="text-muted-foreground text-sm">
            그룹원들의 인증을 응원하세요
          </p>
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <FeedSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // 피드가 없는 경우
  if (feeds.length === 0) {
    return (
      <div className="space-y-4 px-4">
        <div>
          <h2 className="text-lg font-semibold">최근 활동</h2>
          <p className="text-muted-foreground text-sm">
            그룹원들의 인증을 응원하세요
          </p>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-base">아직 활동이 없어요</CardTitle>
            <CardDescription>첫 번째로 미션을 인증해보세요!</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <div>
        <h2 className="text-lg font-semibold">최근 활동</h2>
        <p className="text-muted-foreground text-sm">
          그룹원들의 인증을 응원하세요
        </p>
      </div>
      <div className="space-y-4">
        {feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} onCheer={onCheer} />
        ))}
      </div>
    </div>
  );
}
