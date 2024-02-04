import { test, expect } from '@playwright/test';

test('workout service should be active', async ({ request }) => {
  const response = await request.get('http://workout:8000');
  expect(response.status()).toBe(200);
});

test('auth service should be active', async ({ request }) => {
  const response = await request.get('http://auth:8000');
  expect(response.status()).toBe(200);
});
