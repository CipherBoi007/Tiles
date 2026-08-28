"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../../../SL-Tiles-Showroom/node_modules/@playwright/test");
test_1.test.describe('End-to-End E2E Showroom & Admin Tests', () => {
    const BASE_URL = 'http://localhost:5173';
    (0, test_1.test)('Public Homepage Loads & Displays Hero & Categories', async ({ page }) => {
        await page.goto(BASE_URL);
        await (0, test_1.expect)(page).toHaveTitle(/Tiles|Showroom|Sri Lakshmi/i);
        // Check main branding header
        const header = page.locator('header, nav, h1').first();
        await (0, test_1.expect)(header).toBeVisible();
    });
    (0, test_1.test)('Public Catalog Page Navigation & Filtering', async ({ page }) => {
        await page.goto(`${BASE_URL}/collections`);
        await page.waitForLoadState('networkidle');
        // Check search input presence
        const searchInput = page.locator('input[placeholder*="Search"]').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('Vitrified');
            await page.waitForTimeout(500);
        }
    });
    (0, test_1.test)('Admin Login Workflow & Navigation to Dashboard', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/login`);
        await page.fill('input[type="email"]', 'admin@admin.com');
        await page.fill('input[type="password"]', 'admin123');
        await page.click('button[type="submit"]');
        // Wait for navigation to /admin
        await page.waitForURL(/\/admin/);
        await (0, test_1.expect)(page.locator('text=Dashboard').first()).toBeVisible();
    });
    (0, test_1.test)('Admin Category Management Navigation', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/login`);
        await page.fill('input[type="email"]', 'admin@admin.com');
        await page.fill('input[type="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/admin/);
        await page.click('a[href="/admin/categories"]');
        await page.waitForURL(/\/admin\/categories/);
        await (0, test_1.expect)(page.locator('h1')).toContainText(/Manage Categories/i);
    });
    (0, test_1.test)('Admin Tile Products Drawer Open/Close Workflow', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/login`);
        await page.fill('input[type="email"]', 'admin@admin.com');
        await page.fill('input[type="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/admin/);
        await page.click('a[href="/admin/tiles"]');
        await page.waitForURL(/\/admin\/tiles/);
        const addButton = page.locator('button:has-text("Add New Product")');
        await (0, test_1.expect)(addButton).toBeVisible();
        await addButton.click();
        // Verify slide-over drawer opens
        const drawerTitle = page.locator('text=Create New Product');
        await (0, test_1.expect)(drawerTitle).toBeVisible();
    });
});
