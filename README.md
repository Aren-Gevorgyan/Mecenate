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
- Auth: bearer UUID (test UUID is currently hardcoded in `src/api/client.ts`)

## Run

```bash
npm install
npm run start
```

Then open in Expo Go (`iOS`/`Android`) from the Metro QR code.
