# 미션 인증 폼 컴포넌트 가이드

## 개요

미션 인증을 위한 세 가지 타입별 폼 컴포넌트가 생성되었습니다.

## 컴포넌트 목록

### 1. PhotoVerificationForm (사진 인증 폼)

**파일 위치**: `app/(protected)/missions/_components/photo-verification-form.tsx`

**주요 기능**:

- 이미지 파일 업로드 (accept='image/\*')
- URL.createObjectURL()로 미리보기 생성
- 10MB 파일 크기 제한
- 이미지 제거 버튼 (X 버튼)
- 메모리 정리 (URL.revokeObjectURL)

**Props**:

```typescript
interface PhotoVerificationFormProps {
  onSubmit: (imageFile: File) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}
```

**사용 예시**:

```tsx
<PhotoVerificationForm
  onSubmit={async (imageFile) => {
    // 이미지 업로드 로직
    const formData = new FormData();
    formData.append("image", imageFile);
    await uploadImage(formData);
  }}
  isLoading={uploading}
/>
```

**검증 기준**:

- ✓ 이미지 선택 시 미리보기 표시
- ✓ 10MB 초과 파일 차단
- ✓ 이미지 파일만 허용
- ✓ X 버튼으로 이미지 제거
- ✓ 제출 버튼 활성화/비활성화

---

### 2. TextVerificationForm (텍스트 인증 폼)

**파일 위치**: `app/(protected)/missions/_components/text-verification-form.tsx`

**주요 기능**:

- Textarea로 텍스트 입력
- 최대 1000자 제한
- 실시간 남은 글자 수 표시
- 100자 미만일 때 경고 색상 표시

**Props**:

```typescript
interface TextVerificationFormProps {
  onSubmit: (textContent: string) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}
```

**사용 예시**:

```tsx
<TextVerificationForm
  onSubmit={async (textContent) => {
    // 텍스트 인증 제출 로직
    await createVerification({
      mission_id: missionId,
      text_content: textContent,
    });
  }}
  isLoading={submitting}
/>
```

**검증 기준**:

- ✓ 1000자 제한 작동
- ✓ 남은 글자 수 표시
- ✓ 100자 미만일 때 경고 색상
- ✓ 빈 텍스트 제출 차단
- ✓ 제출 버튼 활성화/비활성화

---

### 3. ChecklistVerificationForm (체크리스트 인증 폼)

**파일 위치**: `app/(protected)/missions/_components/checklist-verification-form.tsx`

**주요 기능**:

- 미션의 기본 체크리스트 항목 표시
- Checkbox로 완료 여부 토글
- 완료된 항목 수 실시간 표시
- 체크된 항목 스타일 변경 (취소선 제거, 색상 변경)
- 최소 1개 항목 체크 필수

**Props**:

```typescript
interface ChecklistVerificationFormProps {
  defaultItems: Array<{ id: string; label: string }>;
  onSubmit: (items: ChecklistItem[]) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}
```

**사용 예시**:

```tsx
<ChecklistVerificationForm
  defaultItems={mission.checklist_items}
  onSubmit={async (items) => {
    // 체크리스트 인증 제출 로직
    await createVerification({
      mission_id: missionId,
      checklist_items: items,
    });
  }}
  isLoading={submitting}
/>
```

**검증 기준**:

- ✓ 체크박스 토글 작동
- ✓ 완료된 항목 수 표시
- ✓ 체크된 항목 스타일 변경
- ✓ 최소 1개 체크 필수
- ✓ 제출 버튼에 완료 개수 표시

---

## 테스트 페이지

**경로**: `/missions/test-verification-forms`

세 가지 인증 폼을 실제로 테스트할 수 있는 페이지가 생성되었습니다.

**기능**:

- 탭으로 각 폼 타입 전환
- 각 폼의 검증 기준 표시
- 실제 제출 시뮬레이션 (2초 대기)
- 제출 결과 알림 표시

**접속 방법**:

1. 개발 서버 실행: `npm run dev`
2. 브라우저에서 `http://localhost:3000/missions/test-verification-forms` 접속
3. 각 탭에서 폼 테스트

---

## 디자인 패턴

### 공통 패턴

1. **폼 제출 핸들러**
   - `onSubmit` prop으로 제출 로직 주입
   - 비동기 처리 지원 (Promise 반환 가능)

2. **로딩 상태 관리**
   - `isLoading` prop으로 제출 중 상태 제어
   - 제출 중일 때 입력 비활성화 및 버튼 텍스트 변경

3. **유효성 검사**
   - 클라이언트 측 기본 검증 (빈 값, 파일 크기 등)
   - alert()로 사용자에게 즉시 피드백

4. **스타일링**
   - Tailwind CSS 사용
   - shadcn/ui 컴포넌트 활용
   - `className` prop으로 추가 스타일 확장 가능

### 참조 파일

- `components/common/verification-feed.tsx` - 체크리스트 렌더링 참조
- `lib/validations/verification.ts` - 인증 스키마 및 타입

---

## 향후 개선 사항

1. **에러 처리 강화**
   - alert() 대신 toast 알림 사용
   - Zod 스키마로 폼 유효성 검사

2. **이미지 최적화**
   - 이미지 압축 기능 추가
   - 다중 이미지 업로드 지원

3. **접근성 개선**
   - 스크린 리더 지원 강화
   - 키보드 네비게이션 최적화

4. **UX 개선**
   - 드래그 앤 드롭 이미지 업로드
   - 자동 저장 기능 (draft)
   - 진행 상황 표시 (progress bar)

---

## 관련 문서

- [Verification Feed 컴포넌트](../components/common/verification-feed.tsx)
- [Verification 스키마](../lib/validations/verification.ts)
- [Database Types](../lib/types/database.ts)
