import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home';

test.describe('Home Page', () => {
  
  test('should have all the right elements', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/NomNom PLC/);

    const expectedLinks = ['list', 'planner', 'data', 'settings'];
    const links = await Promise.all((await homePage.getLinks()).map(link => link.textContent()));
    expect(links).toEqual(expect.arrayContaining(expectedLinks));
  });
});
