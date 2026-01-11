// 미션 관련 Zod 스키마 정의

import { z } from "zod";

import { RepeatType, VerificationType } from "@/lib/types/enums";

/**
 * 반복 유형 스키마
 */
const repeatTypeSchema = z.enum([RepeatType.DAILY, RepeatType.SPECIFIC_DAYS], {
  message: "반복 유형을 선택하세요",
});

/**
 * 인증 유형 스키마
 */
const verificationTypeSchema = z.enum(
  [VerificationType.PHOTO, VerificationType.TEXT, VerificationType.CHECKLIST],
  {
    message: "인증 유형을 선택하세요",
  }
);

/**
 * 반복 요일 스키마 (0-6, 0=일요일)
 */
const repeatDaysSchema = z
  .array(z.number().min(0).max(6))
  .min(1, "최소 하나의 요일을 선택하세요")
  .nullable()
  .optional();

/**
 * 미션 제목 스키마
 */
const missionTitleSchema = z
  .string()
  .min(1, "미션 제목을 입력하세요")
  .max(50, "미션 제목은 50자 이하여야 합니다");

/**
 * 미션 설명 스키마
 */
const missionDescriptionSchema = z
  .string()
  .max(500, "미션 설명은 500자 이하여야 합니다")
  .nullable()
  .optional();

/**
 * 미션 생성 스키마
 */
export const createMissionSchema = z
  .object({
    group_id: z.string().uuid("유효한 그룹 ID가 아닙니다"),
    title: missionTitleSchema,
    description: missionDescriptionSchema,
    repeat_type: repeatTypeSchema,
    repeat_days: repeatDaysSchema,
    verification_type: verificationTypeSchema,
  })
  .refine(
    (data) => {
      // 특정 요일 반복인 경우 요일 선택 필수
      if (data.repeat_type === RepeatType.SPECIFIC_DAYS) {
        return data.repeat_days && data.repeat_days.length > 0;
      }
      return true;
    },
    {
      message: "특정 요일 반복 시 요일을 선택하세요",
      path: ["repeat_days"],
    }
  );

export type CreateMissionInput = z.infer<typeof createMissionSchema>;

/**
 * 미션 수정 스키마
 */
export const updateMissionSchema = z
  .object({
    title: missionTitleSchema.optional(),
    description: missionDescriptionSchema,
    repeat_type: repeatTypeSchema.optional(),
    repeat_days: repeatDaysSchema,
    verification_type: verificationTypeSchema.optional(),
    is_active: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // 특정 요일 반복으로 변경시 요일 선택 필수
      if (data.repeat_type === RepeatType.SPECIFIC_DAYS) {
        return data.repeat_days && data.repeat_days.length > 0;
      }
      return true;
    },
    {
      message: "특정 요일 반복 시 요일을 선택하세요",
      path: ["repeat_days"],
    }
  );

export type UpdateMissionInput = z.infer<typeof updateMissionSchema>;
