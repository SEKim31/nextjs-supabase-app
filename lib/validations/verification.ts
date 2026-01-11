// 인증(Verification) 관련 Zod 스키마 정의

import { z } from "zod";

/**
 * 체크리스트 아이템 스키마
 */
const checklistItemSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "체크리스트 항목을 입력하세요"),
  checked: z.boolean(),
});

/**
 * 인증 생성 스키마 (사진 인증)
 */
export const createPhotoVerificationSchema = z.object({
  mission_id: z.string().uuid("유효한 미션 ID가 아닙니다"),
  image_url: z.string().url("유효한 이미지 URL이 아닙니다"),
});

export type CreatePhotoVerificationInput = z.infer<
  typeof createPhotoVerificationSchema
>;

/**
 * 인증 생성 스키마 (텍스트 인증)
 */
export const createTextVerificationSchema = z.object({
  mission_id: z.string().uuid("유효한 미션 ID가 아닙니다"),
  text_content: z
    .string()
    .min(1, "인증 내용을 입력하세요")
    .max(1000, "인증 내용은 1000자 이하여야 합니다"),
});

export type CreateTextVerificationInput = z.infer<
  typeof createTextVerificationSchema
>;

/**
 * 인증 생성 스키마 (체크리스트 인증)
 */
export const createChecklistVerificationSchema = z.object({
  mission_id: z.string().uuid("유효한 미션 ID가 아닙니다"),
  checklist_items: z
    .array(checklistItemSchema)
    .min(1, "최소 하나의 체크리스트 항목이 필요합니다"),
});

export type CreateChecklistVerificationInput = z.infer<
  typeof createChecklistVerificationSchema
>;

/**
 * 통합 인증 생성 스키마 (모든 인증 유형 지원)
 */
export const createVerificationSchema = z.object({
  mission_id: z.string().uuid("유효한 미션 ID가 아닙니다"),
  image_url: z
    .string()
    .url("유효한 이미지 URL이 아닙니다")
    .nullable()
    .optional(),
  text_content: z
    .string()
    .max(1000, "인증 내용은 1000자 이하여야 합니다")
    .nullable()
    .optional(),
  checklist_items: z.array(checklistItemSchema).nullable().optional(),
});

export type CreateVerificationInput = z.infer<typeof createVerificationSchema>;
