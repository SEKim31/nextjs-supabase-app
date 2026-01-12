"use client";

import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GroupMember, User } from "@/lib/types/database";

interface MemberSectionProps {
  /** 멤버 목록 (사용자 정보 포함) */
  members: (GroupMember & { user: User })[];
  /** 초대 버튼 클릭 핸들러 */
  onInvite: () => void;
}

/**
 * MemberSection - 그룹 멤버 섹션 컴포넌트
 * 멤버 아바타 그리드와 초대 버튼 표시
 */
export function MemberSection({ members, onInvite }: MemberSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            멤버 ({members.length}명)
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onInvite}
            className="gap-1"
          >
            <UserPlus className="h-4 w-4" />
            초대
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* 멤버 아바타 그리드 */}
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={member.user.profile_image_url || undefined}
                  alt={member.user.nickname || "사용자"}
                />
                <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                  {member.user.nickname?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <span className="line-clamp-1 text-center text-xs text-muted-foreground">
                {member.user.nickname || "사용자"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
