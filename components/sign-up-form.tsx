"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { GoogleLoginButton } from "@/components/google-login-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validations/auth";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필드 에러 및 API 에러 초기화
    setError(null);
    setFieldErrors({});
    setIsLoading(true);

    // Zod 스키마 검증
    const result = signUpSchema.safeParse({
      email,
      password,
      confirmPassword: repeatPassword,
    });

    if (!result.success) {
      // 클라이언트 측 검증 실패
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    // Supabase 회원가입 처리
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      // API 에러 처리
      setError(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>새 계정을 만드세요</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 구글 로그인 버튼 */}
          <div className="mb-6">
            <GoogleLoginButton className="w-full" />
          </div>

          {/* 구분선 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">
                또는 이메일로 가입
              </span>
            </div>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                />
                {fieldErrors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-destructive text-sm"
                  >
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={
                    fieldErrors.password ? "password-error" : undefined
                  }
                />
                {fieldErrors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="text-destructive text-sm"
                  >
                    {fieldErrors.password[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">비밀번호 확인</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={
                    fieldErrors.confirmPassword
                      ? "confirm-password-error"
                      : undefined
                  }
                />
                {fieldErrors.confirmPassword && (
                  <p
                    id="confirm-password-error"
                    role="alert"
                    className="text-destructive text-sm"
                  >
                    {fieldErrors.confirmPassword[0]}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked === true)
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-none font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  서비스 이용약관 및 개인정보처리방침에 동의합니다
                </Label>
              </div>
              {error && (
                <p role="alert" className="text-destructive text-sm">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#FF9F40] hover:bg-[#FF9F40]/90"
                disabled={isLoading || !agreedToTerms}
              >
                {isLoading ? "계정 생성 중..." : "회원가입"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                로그인
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
