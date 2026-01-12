"use client";

// 새 그룹 생성 페이지
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Home, MoreHorizontal, Users } from "lucide-react";
import { useForm } from "react-hook-form";

import { PageHeader } from "@/components/layout/page-header";
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
import { RelationshipType, RELATIONSHIP_LABELS } from "@/lib/types/enums";
import {
  createGroupSchema,
  type CreateGroupInput,
} from "@/lib/validations/group";

// 관계 유형별 아이콘 매핑
const RELATIONSHIP_ICONS_MAP = {
  [RelationshipType.COUPLE]: Heart,
  [RelationshipType.FAMILY]: Home,
  [RelationshipType.FRIENDS]: Users,
  [RelationshipType.OTHER]: MoreHorizontal,
} as const;

export default function NewGroupPage() {
  const router = useRouter();

  // react-hook-form 초기화
  const form = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      relationship_type: RelationshipType.FAMILY,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (data: CreateGroupInput) => {
    // TODO: 실제 API 호출 로직 추가
    // eslint-disable-next-line no-console
    console.log("그룹 생성 데이터:", data);
    router.push("/groups");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <PageHeader title="새 그룹 만들기" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 그룹 이름 입력 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>그룹 이름 *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예: 우리 가족"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 그룹 설명 입력 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>그룹 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="그룹을 소개해주세요"
                      className="min-h-[100px] resize-none text-base"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 관계 유형 선택 */}
            <FormField
              control={form.control}
              name="relationship_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>관계 유형 *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-3"
                    >
                      {Object.entries(RelationshipType).map(([_, value]) => {
                        const Icon = RELATIONSHIP_ICONS_MAP[value];
                        const label = RELATIONSHIP_LABELS[value];

                        return (
                          <div key={value}>
                            <RadioGroupItem
                              value={value}
                              id={value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={value}
                              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Icon className="h-6 w-6" />
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
              그룹 만들기
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
