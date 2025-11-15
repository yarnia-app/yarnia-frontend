# Yarnia Frontend

## Proxy Migration

This project has migrated from the deprecated `middleware.ts` file convention to the new `proxy.ts` convention introduced by Next.js.

### Why the Change
Next.js renamed Middleware to Proxy to better reflect its role as a network boundary in front of the application and reduce confusion with traditional Express.js middleware. The feature should be used sparingly—only when other built-in route handlers or server components cannot solve the problem.

### What Changed
Previous root file: `middleware.ts`
New root file: `proxy.ts`

Function rename:
```diff
- export function middleware(request: NextRequest) { ... }
+ export function proxy(request: NextRequest) { ... }
```

The logic (Supabase session management + auth redirect) was preserved in `proxy.ts` by delegating to `updateSession` in `lib/supabase/middleware.ts`.

### Manual Migration Steps (Already Applied)
1. Deleted `middleware.ts` at the project root.
2. Added `proxy.ts` exporting `proxy(request: NextRequest)` and the same `config.matcher` array.
3. Kept helper file `lib/supabase/middleware.ts` unchanged (contains shared session logic).

### Codemod Option (Alternative)
You can perform this migration automatically with the official codemod:
```bash
npx @next/codemod@canary middleware-to-proxy .
```

### Testing the Proxy
1. Start the dev server:
```bash
npm run dev
```
2. Visit a protected route (e.g. `/dashboard`) while logged out. Expect redirect to `/auth/login`.
3. Log in via Supabase auth flow; revisit the same route. Expect successful access and persisted session cookies.
4. Hard reload and confirm session stays active (ensures cookies set via `updateSession`).
5. Access excluded assets (e.g. an image under `_next/image`) to ensure they bypass proxy logic.

### Notes
- Keep returning the response object created inside `updateSession` to avoid desync of cookies.
- Avoid adding arbitrary logic between creating the Supabase server client and calling `supabase.auth.getClaims()`.
- Prefer route handlers (`app/api/*`) or server components where possible before adding new Proxy logic.

If additional auth rules or matcher adjustments are needed, edit `proxy.ts`.
