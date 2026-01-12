"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { ChecklistVerificationForm } from "@/app/(protected)/missions/_components/checklist-verification-form";
import { PhotoVerificationForm } from "@/app/(protected)/missions/_components/photo-verification-form";
import { TextVerificationForm } from "@/app/(protected)/missions/_components/text-verification-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MOCK_USER_IDS } from "@/lib/mocks/helpers";
import { getMockMissionById } from "@/lib/mocks/missions";
import { getMockTodayVerification } from "@/lib/mocks/verifications";
import type { Mission } from "@/lib/types/database";
import { VerificationType } from "@/lib/types/enums";

/**
 * 미션 인증 페이지
 * 미션의 인증 타입에 따라 적절한 폼을 표시
 */
export default function MissionVerifyPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;

  // 현재 사용자 ID (하드코딩 - 실제로는 auth에서 가져옴)
  const currentUserId = MOCK_USER_IDS.USER_1;

  const [mission, setMission] = useState<Mission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayVerification, setTodayVerification] = useState(false);

  // 더미 데이터 로드
  useEffect(() => {
    const missionData = getMockMissionById(missionId);
    const todayVerif = getMockTodayVerification(missionId, currentUserId);

    setMission(missionData || null);
    setTodayVerification(!!todayVerif);
  }, [missionId, currentUserId]);

  // 사진 인증 제출 핸들러
  const handlePhotoSubmit = async (imageFile: File) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // eslint-disable-next-line no-console
    console.log("사진 인증 제출:", { missionId, imageFile });

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 텍스트 인증 제출 핸들러
  const handleTextSubmit = async (textContent: string) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // eslint-disable-next-line no-console
    console.log("텍스트 인증 제출:", { missionId, textContent });

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 체크리스트 인증 제출 핸들러
  const handleChecklistSubmit = async (
    items: Array<{ id: string; label: string; checked: boolean }>
  ) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // eslint-disable-next-line no-console
    console.log("체크리스트 인증 제출:", { missionId, items });

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 로딩 또는 미션이 없는 경우
  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">미션을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 오늘 이미 인증한 경우
  if (todayVerification) {
    return (
      <div className="min-h-screen bg-background">
        {/* 헤더 */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-4 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              aria-label="뒤로가기"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="flex-1 text-center text-lg font-semibold">
              {mission.title}
            </h1>
            <div className="w-10" /> {/* 중앙 정렬용 빈 공간 */}
          </div>
        </header>

        {/* 이미 인증 완료 메시지 */}
        <main className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <div className="text-center">
                <p className="text-2xl">✅</p>
                <h2 className="mt-4 text-lg font-semibold">
                  오늘 인증을 완료했습니다!
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  내일 다시 인증해주세요.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push(`/missions/${missionId}`)}
                className="w-full"
              >
                미션 상세로 돌아가기
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // 인증 폼 렌더링
  const renderVerificationForm = () => {
    switch (mission.verification_type) {
      case VerificationType.PHOTO:
        return (
          <PhotoVerificationForm
            onSubmit={handlePhotoSubmit}
            isLoading={isSubmitting}
          />
        );

      case VerificationType.TEXT:
        return (
          <TextVerificationForm
            onSubmit={handleTextSubmit}
            isLoading={isSubmitting}
          />
        );

      case VerificationType.CHECKLIST:
        // 체크리스트 기본 항목 (실제로는 미션에 저장된 항목 사용)
        const defaultItems = [
          { id: "1", label: "항목 1" },
          { id: "2", label: "항목 2" },
          { id: "3", label: "항목 3" },
        ];

        return (
          <ChecklistVerificationForm
            defaultItems={defaultItems}
            onSubmit={handleChecklistSubmit}
            isLoading={isSubmitting}
          />
        );

      default:
        return (
          <p className="text-center text-muted-foreground">
            지원하지 않는 인증 타입입니다.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="뒤로가기"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="flex-1 text-center text-lg font-semibold">
            {mission.title}
          </h1>
          <div className="w-10" /> {/* 중앙 정렬용 빈 공간 */}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">인증하기</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mission.description || "오늘의 미션을 완료하고 인증해보세요!"}
          </p>
        </div>

        {/* 인증 폼 */}
        {renderVerificationForm()}
      </main>
    </div>
  );
}
