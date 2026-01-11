// 프로필 관련 Zod 스키마 정의

import { z } from "zod";

/**
 * 닉네임 스키마
 */
const nicknameSchema = z
  .string()
  .min(2, "닉네임은 2자 이상이어야 합니다")
  .max(20, "닉네임은 20자 이하여야 합니다")
  .regex(
    /^[가-힣a-zA-Z0-9_]+$/,
    "닉네임은 한글, 영문, 숫자, 밑줄(_)만 사용할 수 있습니다"
  );

/**
 * 프로필 이미지 URL 스키마
 */
const profileImageUrlSchema = z
  .string()
  .url("유효한 URL을 입력하세요")
  .nullable()
  .optional();

/**
 * 프로필 생성 스키마 (최초 설정)
 */
export const createProfileSchema = z.object({
  nickname: nicknameSchema,
  profile_image_url: profileImageUrlSchema,
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

/**
 * 프로필 수정 스키마
 */
export const updateProfileSchema = z.object({
  nickname: nicknameSchema.optional(),
  profile_image_url: profileImageUrlSchema,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
