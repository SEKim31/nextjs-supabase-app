"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

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
import { cn } from "@/lib/utils";
import { createProfileSchema } from "@/lib/validations/profile";

export function ProfileSetupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [nickname, setNickname] = useState("");
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    nickname?: string[];
    profile_image_url?: string[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageChange = (file: File) => {
    setProfileImage(file);
    // 미리보기 URL 생성
    const objectUrl = URL.createObjectURL(file);
    setProfileImageUrl(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필드 에러 및 API 에러 초기화
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      // Zod 스키마 검증
      const result = createProfileSchema.safeParse({
        nickname,
        profile_image_url: profileImageUrl || null,
      });

      if (!result.success) {
        // 클라이언트 측 검증 실패
        const errors = result.error.flatten().fieldErrors;
        setFieldErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Phase 2: 더미 저장 (실제 API 연동은 Phase 3에서 구현 예정)
      // TODO: 실제 프로필 저장 API 호출
      // - nickname: result.data.nickname
      // - profile_image_url: result.data.profile_image_url
      // - profile_image_file: _profileImage

      // 더미 딜레이 (실제 API 호출 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 대시보드로 이동
      router.push("/dashboard");
    } catch (error: unknown) {
      // API 에러 처리
      setError(
        error instanceof Error
          ? error.message
          : "프로필 설정 중 오류가 발생했습니다"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">프로필 설정</CardTitle>
          <CardDescription>
            환영합니다! 프로필을 설정하고 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* 프로필 이미지 업로드 (중앙 정렬, 큰 사이즈) */}
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
                    className="text-destructive text-sm"
                  >
                    {fieldErrors.nickname[0]}
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  한글, 영문, 숫자, 밑줄(_)만 사용 가능합니다
                </p>
              </div>

              {/* 전체 에러 메시지 */}
              {error && (
                <p role="alert" className="text-destructive text-sm">
                  {error}
                </p>
              )}

              {/* 제출 버튼 (브랜드 컬러) */}
              <Button
                type="submit"
                className="w-full bg-[#FF9F40] hover:bg-[#FF9F40]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "저장 중..." : "시작하기"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
