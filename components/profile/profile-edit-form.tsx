"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import { ProfileImageUpload } from "@/components/profile/profile-image-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentMockUser } from "@/lib/mocks/users";
import { cn } from "@/lib/utils";
import { updateProfileSchema } from "@/lib/validations/profile";

export function ProfileEditForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // 상태 관리
  const [nickname, setNickname] = useState("");
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    nickname?: string[];
    profile_image_url?: string[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 원본 값 저장 (변경 감지용)
  const [originalNickname, setOriginalNickname] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState<
    string | undefined
  >();

  // 초기값 설정 (컴포넌트 마운트 시)
  useEffect(() => {
    const currentUser = getCurrentMockUser();

    setNickname(currentUser.nickname ?? "");
    setOriginalNickname(currentUser.nickname ?? "");

    setEmail(currentUser.email);

    const imageUrl = currentUser.profile_image_url || undefined;
    setProfileImageUrl(imageUrl);
    setOriginalImageUrl(imageUrl);
  }, []);

  // 변경사항 감지
  const hasChanges =
    nickname !== originalNickname || profileImageUrl !== originalImageUrl;

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (file: File) => {
    setProfileImage(file);
    // 미리보기 URL 생성
    const objectUrl = URL.createObjectURL(file);
    setProfileImageUrl(objectUrl);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 변경사항이 없으면 제출하지 않음
    if (!hasChanges) {
      return;
    }

    // 필드 에러 및 API 에러 초기화
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      // Zod 스키마 검증 (변경된 경우에만)
      const updateData: {
        nickname?: string;
        profile_image_url?: string | null;
      } = {};

      // 닉네임이 변경된 경우에만 포함
      if (nickname !== originalNickname) {
        updateData.nickname = nickname;
      }

      // 프로필 이미지가 변경된 경우에만 포함
      if (profileImageUrl !== originalImageUrl) {
        updateData.profile_image_url = profileImageUrl || null;
      }

      const result = updateProfileSchema.safeParse(updateData);

      if (!result.success) {
        // 클라이언트 측 검증 실패
        const errors = result.error.flatten().fieldErrors;
        setFieldErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Phase 2: 더미 저장 (실제 API 연동은 Phase 3에서 구현 예정)
      // TODO: 실제 프로필 수정 API 호출
      // - nickname: result.data.nickname (변경된 경우에만)
      // - profile_image_url: result.data.profile_image_url (변경된 경우에만)
      // - profile_image_file: _profileImage

      // 더미 딜레이 (실제 API 호출 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 메시지 표시
      alert("프로필이 성공적으로 수정되었습니다!");

      // 원본 값 업데이트 (변경사항 초기화)
      setOriginalNickname(nickname);
      setOriginalImageUrl(profileImageUrl);
    } catch (error: unknown) {
      // API 에러 처리
      setError(
        error instanceof Error
          ? error.message
          : "프로필 수정 중 오류가 발생했습니다"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {/* 뒤로가기 링크 */}
          <Link
            href="/settings"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            <span>설정으로 돌아가기</span>
          </Link>

          <CardTitle className="text-2xl">프로필 수정</CardTitle>
          <CardDescription>프로필 정보를 수정하고 저장하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* 프로필 이미지 업로드 (중앙 정렬) */}
              <div className="flex justify-center">
                <ProfileImageUpload
                  value={profileImageUrl}
                  onChange={handleImageChange}
                  size="size-32"
                  disabled={isSubmitting}
                />
              </div>

              {/* 닉네임 입력 */}
              <div className="grid gap-2">
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력하세요 (2-20자)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={!!fieldErrors.nickname}
                  aria-describedby={
                    fieldErrors.nickname ? "nickname-error" : undefined
                  }
                />
                {fieldErrors.nickname && (
                  <p
                    id="nickname-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {fieldErrors.nickname[0]}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  한글, 영문, 숫자, 밑줄(_)만 사용 가능합니다
                </p>
              </div>

              {/* 이메일 표시 (읽기 전용) */}
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="cursor-not-allowed opacity-60"
                  readOnly
                />
                <p className="text-xs text-muted-foreground">
                  이메일은 변경할 수 없습니다
                </p>
              </div>

              {/* 전체 에러 메시지 */}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              {/* 저장 버튼 (브랜드 컬러, 변경사항 없으면 비활성화) */}
              <Button
                type="submit"
                className="w-full bg-[#FF9F40] hover:bg-[#FF9F40]/90"
                disabled={isSubmitting || !hasChanges}
              >
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>

              {/* 변경사항 안내 */}
              {!hasChanges && (
                <p className="text-center text-sm text-muted-foreground">
                  변경사항이 없습니다
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
