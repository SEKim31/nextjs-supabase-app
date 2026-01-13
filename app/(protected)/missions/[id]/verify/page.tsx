"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { ChecklistVerificationForm } from "@/app/(protected)/missions/_components/checklist-verification-form";
import { PhotoVerificationForm } from "@/app/(protected)/missions/_components/photo-verification-form";
import { TextVerificationForm } from "@/app/(protected)/missions/_components/text-verification-form";
import { LoadingState } from "@/components/common/loading-state";
import { NotFoundState } from "@/components/common/not-found-state";
import { PageHeader } from "@/components/layout/page-header";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayVerification, setTodayVerification] = useState(false);

  // 더미 데이터 로드
  useEffect(() => {
    const missionData = getMockMissionById(missionId);
    const todayVerif = getMockTodayVerification(missionId, currentUserId);

    setMission(missionData || null);
    setTodayVerification(!!todayVerif);
    setIsLoading(false);
  }, [missionId, currentUserId]);

  // 사진 인증 제출 핸들러
  const handlePhotoSubmit = async (_imageFile: File) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // 인증 로직 구현 예정

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 텍스트 인증 제출 핸들러
  const handleTextSubmit = async (_textContent: string) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // 인증 로직 구현 예정

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 체크리스트 인증 제출 핸들러
  const handleChecklistSubmit = async (
    _items: Array<{ id: string; label: string; checked: boolean }>
  ) => {
    setIsSubmitting(true);

    // TODO: 실제 API 호출
    // 인증 로직 구현 예정

    // 시뮬레이션: 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  // 로딩 상태
  if (isLoading) {
    return <LoadingState message="미션 정보를 불러오는 중..." />;
  }

  // 미션이 없는 경우
  if (!mission) {
    return (
      <NotFoundState
        title="미션을 찾을 수 없습니다"
        message="존재하지 않거나 삭제된 미션입니다."
        actionLabel="뒤로 가기"
        onAction={() => router.back()}
      />
    );
  }

  // 오늘 이미 인증한 경우
  if (todayVerification) {
    return (
      <div className="bg-background min-h-screen">
        {/* 헤더 */}
        <PageHeader title={mission.title} />

        {/* 이미 인증 완료 메시지 */}
        <main className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <div className="text-center">
                <p className="text-2xl">✅</p>
                <h2 className="mt-4 text-lg font-semibold">
                  오늘 인증을 완료했습니다!
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
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
          <p className="text-muted-foreground text-center">
            지원하지 않는 인증 타입입니다.
          </p>
        );
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 헤더 */}
      <PageHeader title={mission.title} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">인증하기</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {mission.description || "오늘의 미션을 완료하고 인증해보세요!"}
          </p>
        </div>

        {/* 인증 폼 */}
        {renderVerificationForm()}
      </main>
    </div>
  );
}
