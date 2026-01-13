"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { ImageIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PhotoVerificationFormProps {
  /** 폼 제출 핸들러 */
  onSubmit: (imageFile: File) => void | Promise<void>;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * PhotoVerificationForm - 사진 인증 폼 컴포넌트
 * 이미지 업로드 및 미리보기 기능 제공
 */
export function PhotoVerificationForm({
  onSubmit,
  isLoading = false,
  className,
}: PhotoVerificationFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // 이미지 파일만 허용
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }

      // 파일 크기 제한 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      setSelectedImage(file);

      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setSelectedImage(null);

    // 메모리 정리
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("인증 사진을 선택해주세요.");
      return;
    }

    onSubmit(selectedImage);
  };

  // 이미지 선택 영역 클릭 핸들러
  const handleSelectAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="verification-image">인증 사진</Label>

        {/* 이미지 미리보기 또는 업로드 영역 */}
        {previewUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={previewUrl}
              alt="인증 사진 미리보기"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* 이미지 제거 버튼 */}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">이미지 제거</span>
            </Button>
          </div>
        ) : (
          <div
            onClick={handleSelectAreaClick}
            className={cn(
              "hover:border-brand-primary hover:bg-accent flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
              isLoading && "pointer-events-none opacity-50"
            )}
          >
            <ImageIcon className="text-muted-foreground mb-2 h-12 w-12" />
            <p className="text-muted-foreground text-sm">클릭하여 사진 선택</p>
            <p className="text-muted-foreground mt-1 text-xs">
              최대 10MB (JPG, PNG, GIF)
            </p>
          </div>
        )}

        {/* 숨겨진 파일 input */}
        <input
          ref={fileInputRef}
          id="verification-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
          className="sr-only"
        />
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        className="w-full"
        disabled={!selectedImage || isLoading}
      >
        {isLoading ? "업로드 중..." : "인증하기"}
      </Button>
    </form>
  );
}
