import { test, expect } from '@playwright/test';

test.describe('Visual Regressions', () => {
  [
    {
      name: 'home-page',
      url: '/',
      disableAnimations: true
    },
    {
      name: 'meal-list',
      url: '/list',
    },
    {
      name: 'meal-planner',
      url: '/planner',
    },
    {
      name: 'data',
      url: '/data',
    },
    {
      name: 'units',
      url: '/units',
    },
    {
      name: 'categories',
      url: '/categories',
    },
    {
      name: 'ingredients',
      url: '/ingredients',
    },
    {
      name: 'recipies',
      url: '/recipies',
    },
    {
      name: 'misc',
      url: '/misc',
    },
    {
      name: 'settings',
      url: '/settings',
    },
  ].forEach(({name, url, disableAnimations}) => {
    test(`regressions for ${name}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle'); 
      
      const screenshot = await page.screenshot({ animations: disableAnimations ? 'disabled' : 'allow' });
      expect(screenshot).toMatchSnapshot(`regression.${name}.png`);
    });
  });
});
