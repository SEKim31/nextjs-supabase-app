"use client";

import { Suspense } from "react";

import {
  DashboardHeader,
  EmptyGroupState,
  FeedSection,
  MissionSection,
  QuickVerifyFab,
  TodaySummaryCard,
} from "./_components";

// TODO: 실제 데이터로 교체 필요
// 임시 샘플 데이터
const SAMPLE_MISSIONS = [
  {
    id: "1",
    title: "아침 운동 30분",
    groupName: "건강한 커플",
    isCompleted: true,
    completionRate: 100,
  },
  {
    id: "2",
    title: "물 2L 마시기",
    groupName: "건강한 커플",
    isCompleted: false,
    completionRate: 50,
  },
  {
    id: "3",
    title: "책 30분 읽기",
    groupName: "독서 모임",
    isCompleted: false,
    completionRate: 33,
  },
];

const SAMPLE_FEEDS = [
  {
    id: "1",
    userName: "김민준",
    userAvatar: undefined,
    missionTitle: "아침 운동 30분",
    timeAgo: "10분 전",
    verificationType: "photo" as const,
    photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
    cheerCount: 3,
    isCheered: false,
  },
  {
    id: "2",
    userName: "박서연",
    userAvatar: undefined,
    missionTitle: "물 2L 마시기",
    timeAgo: "1시간 전",
    verificationType: "check" as const,
    cheerCount: 1,
    isCheered: true,
  },
];

/**
 * 대시보드 페이지
 * 사용자의 메인 활동 허브로 오늘의 미션 현황 및 그룹원 인증 피드를 확인합니다.
 */
export default function DashboardPage() {
  // TODO: 실제 사용자 데이터 가져오기
  const userName = "사용자"; // 임시 닉네임
  const hasGroups = true; // 임시: 그룹 존재 여부
  const completedCount = 1; // 임시: 완료된 미션 수
  const totalCount = 3; // 임시: 전체 미션 수

  // 그룹이 없는 경우 EmptyGroupState 표시
  if (!hasGroups) {
    return (
      <>
        <DashboardHeader userName={userName} />
        <EmptyGroupState />
      </>
    );
  }

  return (
    <>
      {/* 헤더 */}
      <DashboardHeader userName={userName} />

      {/* 메인 콘텐츠 */}
      <div className="space-y-6 pb-6">
        {/* 오늘의 요약 카드 */}
        <div className="px-4">
          <TodaySummaryCard
            completedCount={completedCount}
            totalCount={totalCount}
          />
        </div>

        {/* 미션 섹션 */}
        <Suspense fallback={<MissionSection missions={[]} isLoading={true} />}>
          <MissionSection missions={SAMPLE_MISSIONS} />
        </Suspense>

        {/* 피드 섹션 */}
        <Suspense fallback={<FeedSection feeds={[]} isLoading={true} />}>
          <FeedSection
            feeds={SAMPLE_FEEDS}
            onCheer={(_feedId) => {
              // TODO: 응원 API 호출
              // console.log("Cheered feed:", feedId);
            }}
          />
        </Suspense>
      </div>

      {/* 빠른 인증 플로팅 버튼 */}
      <QuickVerifyFab />
    </>
  );
}
