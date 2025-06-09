# Test info

- Name: Home Page >> should display the meal planner title
- Location: /home/bwright/code/meal-planner/e2e/home.spec.ts:10:3

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

    at /home/bwright/code/meal-planner/e2e/home.spec.ts:6:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Home Page', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the home page before each test
>  6 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
   7 |     await page.waitForLoadState('networkidle');
   8 |   });
   9 |
  10 |   test('should display the meal planner title', async ({ page }) => {
  11 |     // Check if the page title contains "Meal Planner"
  12 |     await expect(page).toHaveTitle(/NomNom PLC/);
  13 |     
  14 |     // Check if the main heading is visible
  15 |     await expect(page.getByRole('heading', { name: 'Meal Planner' })).toBeVisible();
  16 |   });
  17 |
  18 |   test('should display all navigation links', async ({ page }) => {
  19 |     // Check that all four main navigation links are present
  20 |     const expectedLinks = ['list', 'planner', 'data', 'settings'];
  21 |     
  22 |     for (const linkName of expectedLinks) {
  23 |       const link = page.getByRole('link', { name: new RegExp(linkName, 'i') });
  24 |       await expect(link).toBeVisible();
  25 |     }
  26 |   });
  27 |
  28 |   test('should have proper slide-out animation for links', async ({ page }) => {
  29 |     // All links should be visible after animations
  30 |     const links = page.getByRole('link');
  31 |     const linkCount = await links.count();
  32 |     expect(linkCount).toBe(5);
  33 |     
  34 |     // Check that all links are visible and clickable
  35 |     for (let i = 0; i < linkCount; i++) {
  36 |       const link = links.nth(i);
  37 |       await expect(link).toBeVisible();
  38 |       await expect(link).toBeEnabled();
  39 |     }
  40 |   });
  41 | });
  42 |
```