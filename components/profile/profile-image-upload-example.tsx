"use client";

import { useState } from "react";

import { ProfileImageUpload } from "./profile-image-upload";

/**
 * ProfileImageUpload 컴포넌트 사용 예시
 *
 * 이 파일은 참고용 예시이며, 실제 프로젝트에서는 삭제하거나
 * 페이지/폼 컴포넌트에 통합하여 사용하세요.
 */
export function ProfileImageUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImageUrl, _setCurrentImageUrl] = useState<string | undefined>(
    undefined
  );

  const handleFileChange = (file: File) => {
    // eslint-disable-next-line no-console
    console.log("선택된 파일:", file);
    setSelectedFile(file);

    // 실제 프로젝트에서는 여기서 Supabase Storage에 업로드
    // const uploadedUrl = await uploadToSupabase(file);
    // setCurrentImageUrl(uploadedUrl);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">기본 사용</h2>
        <ProfileImageUpload
          value={currentImageUrl}
          onChange={handleFileChange}
        />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">큰 아바타</h2>
        <ProfileImageUpload
          value={currentImageUrl}
          onChange={handleFileChange}
          size="size-32"
        />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">작은 아바타</h2>
        <ProfileImageUpload
          value={currentImageUrl}
          onChange={handleFileChange}
          size="size-16"
        />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">비활성화 상태</h2>
        <ProfileImageUpload
          value={currentImageUrl}
          onChange={handleFileChange}
          disabled
        />
      </div>

      {/* 선택된 파일 정보 표시 */}
      {selectedFile && (
        <div className="w-full max-w-md rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">선택된 파일 정보</h3>
          <dl className="space-y-1 text-sm">
            <div>
              <dt className="inline font-medium">파일명:</dt>
              <dd className="ml-2 inline">{selectedFile.name}</dd>
            </div>
            <div>
              <dt className="inline font-medium">파일 크기:</dt>
              <dd className="ml-2 inline">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </dd>
            </div>
            <div>
              <dt className="inline font-medium">파일 타입:</dt>
              <dd className="ml-2 inline">{selectedFile.type}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
