# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\adversarial.spec.ts >> Adversarial E2E Testing >> Admin chunk loading fails gracefully on network drop
- Location: tests\adversarial.spec.ts:11:3

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at http://localhost:5173/admin/login
Call log:
  - navigating to "http://localhost:5173/admin/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Adversarial E2E Testing', () => {
  4  |   const BASE_URL = 'http://localhost:5173';
  5  | 
  6  |   test('Public Homepage Loads Successfully', async ({ page }) => {
  7  |     await page.goto(BASE_URL);
  8  |     await expect(page.locator('body')).toBeVisible();
  9  |   });
  10 | 
  11 |   test('Admin chunk loading fails gracefully on network drop', async ({ page, context }) => {
  12 |     await page.goto(BASE_URL);
  13 |     // Simulate offline mode to test React.lazy error boundary
  14 |     await context.setOffline(true);
> 15 |     await page.goto(`${BASE_URL}/admin/login`);
     |                ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at http://localhost:5173/admin/login
  16 |     // Should show error boundary fallback instead of white screen
  17 |     await expect(page.locator('text=Error')).toBeVisible();
  18 |   });
  19 | 
  20 |   test('XSS Injection on Enquiry Form', async ({ page }) => {
  21 |     await page.goto(`${BASE_URL}/contact`);
  22 |     await page.fill('input[name="customer"]', '<script>alert("XSS")</script>');
  23 |     await page.fill('input[name="phone"]', '1234567890');
  24 |     await page.click('button[type="submit"]');
  25 |     
  26 |     // Verify alert does not trigger
  27 |     page.on('dialog', dialog => {
  28 |       expect(dialog.type()).not.toBe('alert');
  29 |     });
  30 |   });
  31 | });
  32 | 
```