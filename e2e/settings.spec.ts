import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home';
import { SettingsPage } from './pages/settings';

test.describe('Settings Page', () => {
  
  test('reachable from the main menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigateTo('settings');

    const settingsPage = new SettingsPage(page);
    await settingsPage.expectCurrent();
  });
});
