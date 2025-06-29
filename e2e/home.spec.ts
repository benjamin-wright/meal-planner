import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  
  test('should have all the right elements', async ({ page }) => {
    await page.goto('/');

    // Check if the page title contains "Meal Planner"
    await expect(page).toHaveTitle(/NomNom PLC/);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: 'Meal Planner' })).toBeVisible();
    
    const expectedLinks = ['list', 'planner', 'data', 'settings'];
    
    for (const linkName of expectedLinks) {
      const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
    }
  });
});
