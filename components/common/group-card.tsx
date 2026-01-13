"use client";

import { Heart, Home, MoreHorizontal, Users as UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GroupCardData } from "@/lib/types/database";
import type { RelationshipType } from "@/lib/types/enums";
import { RELATIONSHIP_LABELS } from "@/lib/types/enums";
import { cn } from "@/lib/utils";

interface GroupCardProps {
  /** 그룹 데이터 */
  group: GroupCardData;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

// 관계 유형별 아이콘 매핑
const RELATIONSHIP_ICON_MAP: Record<RelationshipType, React.ElementType> = {
  couple: Heart,
  family: Home,
  friends: UsersIcon,
  other: MoreHorizontal,
};

/**
 * GroupCard - 그룹 카드 컴포넌트
 * 그룹 목록에서 각 그룹의 정보를 표시
 */
export function GroupCard({ group, onClick, className }: GroupCardProps) {
  const Icon = RELATIONSHIP_ICON_MAP[group.relationship_type];
  const completionRate = Math.round(group.today_completion_rate * 100);

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{group.name}</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Icon className="h-3 w-3" />
            <span className="text-xs">
              {RELATIONSHIP_LABELS[group.relationship_type]}
            </span>
          </Badge>
        </div>
        {group.description && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {group.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 멤버 수 */}
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <UsersIcon className="h-4 w-4" />
          <span>{group.member_count}명</span>
        </div>

        {/* 오늘의 달성률 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">오늘의 달성률</span>
            <span className="text-brand-primary font-semibold">
              {completionRate}%
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
