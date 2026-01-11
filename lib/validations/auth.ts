// 인증 관련 Zod 스키마 정의

import { z } from "zod";

/**
 * 이메일 기본 스키마
 */
const emailSchema = z
  .string()
  .min(1, "이메일을 입력하세요")
  .email("유효한 이메일을 입력하세요");

/**
 * 비밀번호 기본 스키마
 */
const passwordSchema = z
  .string()
  .min(6, "비밀번호는 6자 이상이어야 합니다")
  .max(72, "비밀번호는 72자 이하여야 합니다");

/**
 * 로그인 스키마
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * 회원가입 스키마
 */
export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력하세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

/**
 * 비밀번호 재설정 요청 스키마
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * 비밀번호 변경 스키마
 */
export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력하세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
