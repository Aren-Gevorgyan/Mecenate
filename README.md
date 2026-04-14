# Mecenate Feed Test App

React Native + Expo app implementing the Mecenate feed assignment.

## Implemented requirements

- Feed screen with post cards (avatar, author name, preview, cover, likes and comments count)
- Cursor-based pagination on scroll down
- Pull-to-refresh
- Paid post placeholder (`tier === "paid"`)
- Error state with retry button and message: `Не удалось загрузить публикации`
- TypeScript + React Query + MobX + design tokens

## API

- Base URL: `https://k8s.mectest.ru/test-app`
- Auth: bearer UUID (`Authorization: Bearer <uuid>`)

## Environment variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_API_BASE_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_TEST_USER_UUID=550e8400-e29b-41d4-a716-446655440000
```

Notes:
- Only `EXPO_PUBLIC_*` variables are available in Expo runtime.
- Both vars are optional because defaults are already set in `src/api/client.ts`.

## How to run

```bash
npm install
npm run start
```

Optional platform commands:

```bash
npm run android
npm run ios
npm run web
```

Then open in Expo Go (`iOS`/`Android`) from the Metro QR code.
