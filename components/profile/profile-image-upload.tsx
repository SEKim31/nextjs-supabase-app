"use client";

import { useEffect, useRef, useState } from "react";

import { Camera, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileImageUploadProps {
  /** 현재 이미지 URL */
  value?: string;
  /** 파일 선택 시 콜백 (File 객체 전달) */
  onChange?: (file: File) => void;
  /** 아바타 크기 (Tailwind 클래스) */
  size?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export function ProfileImageUpload({
  value,
  onChange,
  size = "size-24",
  disabled = false,
}: ProfileImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // value가 변경되면 previewUrl 업데이트
  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  // 메모리 cleanup
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateFile = (file: File): string | undefined => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "이미지 파일만 업로드 가능합니다 (JPEG, PNG, WebP, GIF)";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "파일 크기는 5MB 이하여야 합니다";
    }

    return undefined;
  };

  const handleFileSelect = (file: File) => {
    if (disabled) return;

    setError(undefined);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // 이전 미리보기 URL 해제
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    // 새 미리보기 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // 부모 컴포넌트에 파일 전달
    onChange?.(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="프로필 이미지 업로드"
        aria-disabled={disabled}
        className={cn(
          "focus:ring-brand group relative cursor-pointer rounded-full transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          isDragging && "ring-brand ring-2 ring-offset-2"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Avatar className={cn(size)}>
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt="프로필 이미지" />
          ) : null}
          <AvatarFallback>
            <User className="size-1/2 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* 호버 오버레이 */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity",
            !disabled && "group-hover:opacity-100 group-focus:opacity-100"
          )}
        >
          <Camera className="size-1/3 text-white" />
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={handleInputChange}
        disabled={disabled}
        aria-hidden="true"
      />

      {/* 에러 메시지 */}
      {error && (
        <p
          className="max-w-xs text-center text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* 안내 텍스트 */}
      {!error && !disabled && (
        <p className="max-w-xs text-center text-xs text-muted-foreground">
          클릭 또는 드래그하여 이미지 업로드
          <br />
          (최대 5MB, JPEG/PNG/WebP/GIF)
        </p>
      )}
    </div>
  );
}
