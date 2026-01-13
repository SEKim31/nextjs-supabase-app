"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChecklistVerificationForm } from "./checklist-verification-form";
import { PhotoVerificationForm } from "./photo-verification-form";
import { TextVerificationForm } from "./text-verification-form";

/**
 * VerificationFormsTest - 인증 폼 테스트 컴포넌트
 * 세 가지 인증 타입 폼을 테스트할 수 있는 페이지
 */
export function VerificationFormsTest() {
  const [isLoading, setIsLoading] = useState(false);

  // 사진 인증 제출 핸들러
  const handlePhotoSubmit = async (imageFile: File) => {
    setIsLoading(true);
    // eslint-disable-next-line no-console
    console.log("사진 인증 제출:", imageFile);
    // 시뮬레이션: 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `사진 인증 완료!\n파일명: ${imageFile.name}\n크기: ${(imageFile.size / 1024).toFixed(2)}KB`
    );
    setIsLoading(false);
  };

  // 텍스트 인증 제출 핸들러
  const handleTextSubmit = async (textContent: string) => {
    setIsLoading(true);
    // eslint-disable-next-line no-console
    console.log("텍스트 인증 제출:", textContent);
    // 시뮬레이션: 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `텍스트 인증 완료!\n내용: ${textContent.substring(0, 50)}${textContent.length > 50 ? "..." : ""}\n글자 수: ${textContent.length}자`
    );
    setIsLoading(false);
  };

  // 체크리스트 인증 제출 핸들러
  const handleChecklistSubmit = async (
    items: Array<{ id: string; label: string; checked: boolean }>
  ) => {
    setIsLoading(true);
    // eslint-disable-next-line no-console
    console.log("체크리스트 인증 제출:", items);
    const completedItems = items.filter((item) => item.checked);
    // 시뮬레이션: 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `체크리스트 인증 완료!\n완료된 항목: ${completedItems.length}/${items.length}\n${completedItems.map((item) => `✓ ${item.label}`).join("\n")}`
    );
    setIsLoading(false);
  };

  // 샘플 체크리스트 항목
  const sampleChecklistItems = [
    { id: "1", label: "30분 이상 운동하기" },
    { id: "2", label: "물 2L 마시기" },
    { id: "3", label: "스트레칭 10분 하기" },
    { id: "4", label: "건강한 식사 3끼 먹기" },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">인증 폼 테스트</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          세 가지 인증 타입의 폼을 테스트할 수 있습니다.
        </p>
      </div>

      <Tabs defaultValue="photo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="photo">사진 인증</TabsTrigger>
          <TabsTrigger value="text">텍스트 인증</TabsTrigger>
          <TabsTrigger value="checklist">체크리스트 인증</TabsTrigger>
        </TabsList>

        <TabsContent value="photo" className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">사진 인증 폼</h2>
            <PhotoVerificationForm
              onSubmit={handlePhotoSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-2 text-sm font-semibold">테스트 기준</h3>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>✓ 이미지 선택 시 미리보기 표시</li>
              <li>✓ 10MB 초과 파일 업로드 차단</li>
              <li>✓ 이미지 파일만 업로드 가능</li>
              <li>✓ X 버튼으로 이미지 제거 가능</li>
              <li>✓ 제출 버튼 활성화/비활성화</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">텍스트 인증 폼</h2>
            <TextVerificationForm
              onSubmit={handleTextSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-2 text-sm font-semibold">테스트 기준</h3>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>✓ 1000자 제한이 작동</li>
              <li>✓ 남은 글자 수 표시</li>
              <li>✓ 100자 미만일 때 경고 색상</li>
              <li>✓ 빈 텍스트 제출 차단</li>
              <li>✓ 제출 버튼 활성화/비활성화</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">체크리스트 인증 폼</h2>
            <ChecklistVerificationForm
              defaultItems={sampleChecklistItems}
              onSubmit={handleChecklistSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-2 text-sm font-semibold">테스트 기준</h3>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>✓ 체크박스 토글 작동</li>
              <li>✓ 완료된 항목 수 표시</li>
              <li>✓ 체크된 항목 스타일 변경</li>
              <li>✓ 최소 1개 체크 필수</li>
              <li>✓ 제출 버튼에 완료 개수 표시</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
