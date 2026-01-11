import { createBrowserClient } from "@supabase/ssr";

/**
 * 브라우저 환경에서 사용하는 Supabase 클라이언트 생성
 * Client Components에서 사용합니다.
 *
 * @throws {Error} 환경 변수가 설정되지 않은 경우
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase 환경 변수가 설정되지 않았습니다. " +
        "NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 확인하세요."
    );
  }

  return createBrowserClient(url, key);
}
