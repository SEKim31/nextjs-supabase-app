import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NotFoundStateProps {
  /**
   * 표시할 메시지
   */
  message?: string;

  /**
   * 제목
   */
  title?: string;

  /**
   * 액션 버튼 텍스트
   */
  actionLabel?: string;

  /**
   * 액션 버튼 클릭 핸들러
   */
  onAction?: () => void;

  /**
   * 전체 화면 표시 여부
   * true: min-h-screen 적용
   * false: 컨테이너 크기만큼만 표시
   */
  fullScreen?: boolean;

  /**
   * 추가 CSS 클래스명
   */
  className?: string;
}

/**
 * 공통 데이터 없음 상태 컴포넌트
 * - 데이터를 찾을 수 없을 때 표시
 * - 옵션 액션 버튼
 */
export function NotFoundState({
  message = "요청하신 데이터를 찾을 수 없습니다.",
  title = "데이터 없음",
  actionLabel,
  onAction,
  fullScreen = true,
  className,
}: NotFoundStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        fullScreen && "min-h-screen",
        className
      )}
    >
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <FileQuestion className="text-muted-foreground h-6 w-6" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>

        {actionLabel && onAction && (
          <CardContent>
            <Button onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
