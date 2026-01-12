"use client";

import { useState } from "react";

import Link from "next/link";

import { Bell, ChevronRight, LogOut, User, UserX } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentMockUser } from "@/lib/mocks/users";

/**
 * 설정 메인 페이지
 * 프로필 정보, 메뉴 링크, 로그아웃, 계정 탈퇴 기능 제공
 */
export default function SettingsPage() {
  // 현재 사용자 정보 조회
  const currentUser = getCurrentMockUser();

  // 다이얼로그 상태 관리
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
    useState(false);

  // 로그아웃 확인 핸들러
  const handleConfirmLogout = () => {
    // TODO: 실제 로그아웃 API 호출
    alert("로그아웃 되었습니다");
    setIsLogoutDialogOpen(false);
  };

  // 계정 탈퇴 확인 핸들러
  const handleConfirmDeleteAccount = () => {
    // TODO: 실제 계정 탈퇴 API 호출
    alert("계정이 탈퇴되었습니다");
    setIsDeleteAccountDialogOpen(false);
  };

  // 닉네임의 첫 글자 추출 (Avatar Fallback용)
  const getInitial = (nickname: string) => {
    return nickname.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto space-y-6 p-4">
        {/* 페이지 제목 */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">설정</h1>
          <p className="text-sm text-muted-foreground">
            프로필과 계정을 관리하세요
          </p>
        </div>

        {/* 프로필 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>내 프로필 정보</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {/* 아바타 */}
              <Avatar className="size-16">
                <AvatarImage
                  src={currentUser.profile_image_url ?? undefined}
                  alt={currentUser.nickname ?? undefined}
                />
                <AvatarFallback className="text-lg">
                  {getInitial(currentUser.nickname ?? "")}
                </AvatarFallback>
              </Avatar>

              {/* 닉네임 및 이메일 */}
              <div className="flex-1 space-y-1">
                <p className="font-medium">{currentUser.nickname}</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>설정 메뉴</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {/* 프로필 수정 */}
            <Link
              href="/settings/profile"
              className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted"
            >
              <User className="size-5 text-muted-foreground" />
              <span className="flex-1 font-medium">프로필 수정</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>

            <Separator />

            {/* 알림 설정 */}
            <Link
              href="/settings/notifications"
              className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted"
            >
              <Bell className="size-5 text-muted-foreground" />
              <span className="flex-1 font-medium">알림 설정</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>

        {/* 계정 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>계정 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {/* 로그아웃 */}
            <button
              type="button"
              onClick={() => setIsLogoutDialogOpen(true)}
              className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-muted"
            >
              <LogOut className="size-5 text-muted-foreground" />
              <span className="flex-1 font-medium">로그아웃</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>

            <Separator />

            {/* 계정 탈퇴 */}
            <button
              type="button"
              onClick={() => setIsDeleteAccountDialogOpen(true)}
              className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-muted"
            >
              <UserX className="size-5 text-destructive" />
              <span className="flex-1 font-medium text-destructive">
                계정 탈퇴
              </span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </main>

      {/* 로그아웃 확인 다이얼로그 */}
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              다시 로그인하려면 이메일과 비밀번호를 입력해야 합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLogout}>
              로그아웃
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 계정 탈퇴 확인 다이얼로그 */}
      <AlertDialog
        open={isDeleteAccountDialogOpen}
        onOpenChange={setIsDeleteAccountDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>계정을 탈퇴하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 모든 데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              탈퇴하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
