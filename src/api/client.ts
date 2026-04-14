const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://k8s.mectest.ru/test-app';
const TEST_USER_UUID =
  process.env.EXPO_PUBLIC_TEST_USER_UUID ??
  '550e8400-e29b-41d4-a716-446655440000';

type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TEST_USER_UUID}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
};

export const apiPost = async <T>(path: string, body?: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TEST_USER_UUID}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
};
