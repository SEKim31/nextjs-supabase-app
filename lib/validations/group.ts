// 그룹 관련 Zod 스키마 정의

import { z } from "zod";

import { RelationshipType } from "@/lib/types/enums";

/**
 * 관계 유형 스키마
 */
const relationshipTypeSchema = z.enum(
  [
    RelationshipType.COUPLE,
    RelationshipType.FAMILY,
    RelationshipType.FRIENDS,
    RelationshipType.OTHER,
  ],
  {
    message: "관계 유형을 선택하세요",
  }
);

/**
 * 그룹 이름 스키마
 */
const groupNameSchema = z
  .string()
  .min(1, "그룹 이름을 입력하세요")
  .max(30, "그룹 이름은 30자 이하여야 합니다");

/**
 * 그룹 설명 스키마
 */
const groupDescriptionSchema = z
  .string()
  .max(200, "설명은 200자 이하여야 합니다")
  .nullable()
  .optional();

/**
 * 그룹 생성 스키마
 */
export const createGroupSchema = z.object({
  name: groupNameSchema,
  description: groupDescriptionSchema,
  relationship_type: relationshipTypeSchema,
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;

/**
 * 그룹 수정 스키마
 */
export const updateGroupSchema = z.object({
  name: groupNameSchema.optional(),
  description: groupDescriptionSchema,
  relationship_type: relationshipTypeSchema.optional(),
});

export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
