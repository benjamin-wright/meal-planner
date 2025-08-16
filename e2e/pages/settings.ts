import { expect, Page } from "@playwright/test";

export class SettingsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCurrent() {
    await expect(this.page).toHaveURL(/\/settings/);
  }

  async goto() {
    await this.page.goto('/settings');
    await expect(this.page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  }
}