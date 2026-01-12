"use client";

import { useState } from "react";

import Link from "next/link";

import { Bell, ChevronLeft, Sparkles, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function NotificationSettingsPage() {
  // 상태 관리 (모두 기본값 true)
  const [pushEnabled, setPushEnabled] = useState(true);
  const [cheerNotification, setCheerNotification] = useState(true);
  const [reminderNotification, setReminderNotification] = useState(true);
  const [groupActivityNotification, setGroupActivityNotification] =
    useState(true);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        {/* 뒤로가기 링크 */}
        <Link
          href="/settings"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span>설정으로 돌아가기</span>
        </Link>

        {/* 헤더 */}
        <h1 className="text-2xl font-bold">알림 설정</h1>
        <p className="mt-2 text-muted-foreground">
          받고 싶은 알림을 선택하세요
        </p>
      </div>

      {/* 푸시 알림 마스터 토글 */}
      <Card>
        <CardHeader>
          <CardTitle>푸시 알림</CardTitle>
          <CardDescription>
            모든 푸시 알림을 켜거나 끌 수 있습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">전체 푸시 알림</p>
                <p className="text-sm text-muted-foreground">
                  모든 알림 활성화
                </p>
              </div>
            </div>
            <Switch
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
              aria-label="전체 푸시 알림 토글"
            />
          </div>
        </CardContent>
      </Card>

      {/* 알림 유형별 토글 */}
      <Card>
        <CardHeader>
          <CardTitle>알림 유형</CardTitle>
          <CardDescription>받고 싶은 알림 유형을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* 응원 알림 */}
            <div
              className={cn(
                "flex items-center justify-between",
                !pushEnabled && "opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">응원 알림</p>
                  <p className="text-sm text-muted-foreground">
                    그룹원의 응원 메시지
                  </p>
                </div>
              </div>
              <Switch
                checked={cheerNotification}
                onCheckedChange={setCheerNotification}
                disabled={!pushEnabled}
                aria-label="응원 알림 토글"
              />
            </div>

            {/* 미션 리마인더 알림 */}
            <div
              className={cn(
                "flex items-center justify-between",
                !pushEnabled && "opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Bell className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">미션 리마인더</p>
                  <p className="text-sm text-muted-foreground">
                    미션 시작 시간 알림
                  </p>
                </div>
              </div>
              <Switch
                checked={reminderNotification}
                onCheckedChange={setReminderNotification}
                disabled={!pushEnabled}
                aria-label="미션 리마인더 토글"
              />
            </div>

            {/* 그룹 활동 알림 */}
            <div
              className={cn(
                "flex items-center justify-between",
                !pushEnabled && "opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Users className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">그룹 활동</p>
                  <p className="text-sm text-muted-foreground">
                    그룹 초대 및 활동 알림
                  </p>
                </div>
              </div>
              <Switch
                checked={groupActivityNotification}
                onCheckedChange={setGroupActivityNotification}
                disabled={!pushEnabled}
                aria-label="그룹 활동 알림 토글"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 안내 메시지 */}
      <p className="text-center text-sm text-muted-foreground">
        실제 푸시 알림 기능은 추후 업데이트 예정입니다
      </p>
    </div>
  );
}
