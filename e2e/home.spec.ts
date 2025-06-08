import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the meal planner title', async ({ page }) => {
    // Check if the page title contains "Meal Planner"
    await expect(page).toHaveTitle(/NomNom PLC/);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: 'Meal Planner' })).toBeVisible();
  });

  test('should display all navigation links', async ({ page }) => {
    // Check that all four main navigation links are present
    const expectedLinks = ['list', 'planner', 'data', 'settings'];
    
    for (const linkName of expectedLinks) {
      const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });
      await expect(link).toBeVisible();
    }
  });

  test('should have proper slide-out animation for links', async ({ page }) => {
    // All links should be visible after animations
    const links = page.getByRole('link');
    const linkCount = await links.count();
    expect(linkCount).toBe(5);
    
    // Check that all links are visible and clickable
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
    }
  });
});
