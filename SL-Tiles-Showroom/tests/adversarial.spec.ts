import { test, expect } from '@playwright/test';

test.describe('Adversarial E2E Testing', () => {
  const BASE_URL = 'http://localhost:5173';

  test('Public Homepage Loads Successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Admin Login Loads Successfully', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/login`);
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('XSS Injection on Enquiry Form', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
    await page.fill('input[name="name"]', '<script>alert("XSS")</script>');
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('textarea[name="message"]', 'Test message for XSS');
    
    let dialogTriggered = false;
    page.on('dialog', dialog => {
      dialogTriggered = true;
      expect(dialog.type()).not.toBe('alert');
    });
    
    await page.click('button[type="submit"]');
    
    // Wait for the button text to change to 'Sending...' or 'Message Sent Successfully!'
    await expect(page.locator('button[type="submit"]')).toContainText(/Sending|Message Sent|Error/);
    
    // Ensure no alert was triggered
    expect(dialogTriggered).toBe(false);
  });
});
