import Link from "next/link";

import { AlertCircle, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getMockGroupById,
  getMockMembersForGroup,
  MOCK_GROUP_INVITES,
} from "@/lib/mocks/groups";
import { RelationshipType } from "@/lib/types/enums";

/**
 * 관계 유형별 Badge variant 매핑
 */
function getRelationshipBadgeVariant(
  type: RelationshipType
): "default" | "secondary" | "outline" {
  switch (type) {
    case RelationshipType.COUPLE:
      return "default";
    case RelationshipType.FAMILY:
      return "secondary";
    case RelationshipType.FRIENDS:
      return "outline";
    default:
      return "default";
  }
}

/**
 * 관계 유형별 한글 레이블
 */
function getRelationshipLabel(type: RelationshipType): string {
  switch (type) {
    case RelationshipType.COUPLE:
      return "커플";
    case RelationshipType.FAMILY:
      return "가족";
    case RelationshipType.FRIENDS:
      return "친구";
    default:
      return "그룹";
  }
}

/**
 * 초대 링크 접속 페이지
 * - 유효한 토큰: 그룹 정보 표시 + 가입 버튼
 * - 만료된 토큰: 에러 메시지
 * - 유효하지 않은 토큰: 에러 메시지
 */
export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // MOCK_GROUP_INVITES에서 토큰으로 초대 정보 조회
  const invite = MOCK_GROUP_INVITES.find((inv) => inv.token === token);

  // 유효하지 않은 토큰
  if (!invite) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-6 w-6" />
            </div>
            <CardTitle>유효하지 않은 초대 링크</CardTitle>
            <CardDescription>
              초대 링크가 유효하지 않습니다. 초대한 사람에게 새로운 링크를
              요청해 주세요.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/groups">그룹 목록으로 이동</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 만료 여부 확인
  const isExpired = new Date(invite.expires_at) < new Date();

  // 만료된 토큰
  if (isExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-6 w-6" />
            </div>
            <CardTitle>만료된 초대 링크</CardTitle>
            <CardDescription>
              이 초대 링크는 만료되었습니다. 초대한 사람에게 새로운 링크를
              요청해 주세요.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/groups">그룹 목록으로 이동</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 그룹 정보 조회
  const group = getMockGroupById(invite.group_id);

  // 그룹을 찾을 수 없는 경우 (예외 상황)
  if (!group) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertCircle className="text-destructive h-6 w-6" />
            </div>
            <CardTitle>그룹을 찾을 수 없습니다</CardTitle>
            <CardDescription>
              초대된 그룹이 삭제되었거나 더 이상 존재하지 않습니다.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/groups">그룹 목록으로 이동</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 그룹 멤버 수 조회
  const members = getMockMembersForGroup(group.id);
  const memberCount = members.length;

  // 유효한 토큰: 그룹 미리보기 카드
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl">{group.name}</CardTitle>
              <CardDescription className="mt-2">
                {group.description}
              </CardDescription>
            </div>
            <Badge
              variant={getRelationshipBadgeVariant(group.relationship_type)}
            >
              {getRelationshipLabel(group.relationship_type)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{memberCount}명의 멤버</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/groups">그룹 참여하기</Link>
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            그룹에 참여하면 멤버들과 함께 습관을 공유하고 응원할 수 있습니다.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
