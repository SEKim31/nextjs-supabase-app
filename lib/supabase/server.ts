import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

/**
 * 서버 환경에서 사용하는 Supabase 클라이언트 생성
 * Server Components, Route Handlers, Server Actions에서 사용합니다.
 *
 * Fluid compute 환경에서는 전역 변수에 저장하지 말고,
 * 매 요청마다 새로 생성해야 합니다.
 *
 * @throws {Error} 환경 변수가 설정되지 않은 경우
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase 환경 변수가 설정되지 않았습니다. " +
        "NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 확인하세요."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have proxy refreshing
          // user sessions.
        }
      },
    },
  });
}
