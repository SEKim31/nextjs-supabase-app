"use client";

import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CheckSquare, ChevronLeft, FileText } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getMockMissionById } from "@/lib/mocks/missions";
import {
  DAY_LABELS,
  DayOfWeek,
  REPEAT_LABELS,
  RepeatType,
  VERIFICATION_LABELS,
  VerificationType,
} from "@/lib/types/enums";
import {
  updateMissionSchema,
  type UpdateMissionInput,
} from "@/lib/validations/mission";

// 인증 타입별 아이콘 매핑
const VERIFICATION_ICONS_MAP = {
  [VerificationType.PHOTO]: Camera,
  [VerificationType.TEXT]: FileText,
  [VerificationType.CHECKLIST]: CheckSquare,
} as const;

// 요일 배열 (월~일 순서)
const DAYS_ORDER: DayOfWeek[] = [1, 2, 3, 4, 5, 6, 0];

/**
 * 미션 수정 페이지
 * 기존 미션 데이터를 불러와 수정할 수 있는 폼 제공
 */
export default function EditMissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;

  // react-hook-form 초기화
  const form = useForm<UpdateMissionInput>({
    resolver: zodResolver(updateMissionSchema),
    defaultValues: {
      title: "",
      description: "",
      repeat_type: RepeatType.DAILY,
      repeat_days: null,
      verification_type: VerificationType.PHOTO,
      is_active: true,
    },
  });

  // 미션 데이터 로드
  useEffect(() => {
    const mission = getMockMissionById(missionId);

    if (!mission) {
      // 미션이 없으면 목록으로 이동
      router.push("/groups");
      return;
    }

    // 폼에 기존 데이터 설정
    form.reset({
      title: mission.title,
      description: mission.description,
      repeat_type: mission.repeat_type,
      repeat_days: mission.repeat_days,
      verification_type: mission.verification_type,
      is_active: mission.is_active,
    });
  }, [missionId, router, form]);

  // 반복 유형 변경 감지
  const repeatType = form.watch("repeat_type");

  // 폼 제출 핸들러
  const onSubmit = (data: UpdateMissionInput) => {
    // TODO: 실제 API 호출 로직 추가
    // eslint-disable-next-line no-console
    console.log("미션 수정 데이터:", { missionId, ...data });

    // 미션 상세 페이지로 이동
    router.push(`/missions/${missionId}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
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
          <h1 className="text-lg font-semibold">미션 수정</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 미션 제목 입력 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>미션 제목 *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예: 물 2L 마시기"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 미션 설명 입력 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>미션 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="미션에 대한 상세 설명을 입력해주세요"
                      className="min-h-[100px] resize-none text-base"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 반복 유형 선택 */}
            <FormField
              control={form.control}
              name="repeat_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>반복 유형 *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      {Object.entries(RepeatType).map(([_, value]) => {
                        const label = REPEAT_LABELS[value];

                        return (
                          <div key={value}>
                            <RadioGroupItem
                              value={value}
                              id={`repeat-${value}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`repeat-${value}`}
                              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-sm font-medium">
                                {label}
                              </span>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 특정 요일 선택 (특정 요일 반복 선택 시만 표시) */}
            {repeatType === RepeatType.SPECIFIC_DAYS && (
              <FormField
                control={form.control}
                name="repeat_days"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>반복 요일 *</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        value={(field.value ?? []).map(String)}
                        onValueChange={(values) => {
                          const days = values.map(Number).sort((a, b) => a - b);
                          field.onChange(days.length > 0 ? days : null);
                        }}
                        className="grid grid-cols-7 gap-2"
                      >
                        {DAYS_ORDER.map((day) => (
                          <ToggleGroupItem
                            key={day}
                            value={String(day)}
                            aria-label={DAY_LABELS[day]}
                            className="h-10 w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          >
                            {DAY_LABELS[day]}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* 인증 타입 선택 */}
            <FormField
              control={form.control}
              name="verification_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>인증 방법 *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-3"
                    >
                      {Object.entries(VerificationType).map(([_, value]) => {
                        const Icon = VERIFICATION_ICONS_MAP[value];
                        const label = VERIFICATION_LABELS[value];

                        return (
                          <div key={value}>
                            <RadioGroupItem
                              value={value}
                              id={`verification-${value}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`verification-${value}`}
                              className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Icon className="h-5 w-5" />
                              <span className="text-sm font-medium">
                                {label}
                              </span>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              수정 완료
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
