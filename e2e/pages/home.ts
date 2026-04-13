import { expect, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCurrent() {
    await expect(this.page).toHaveURL(/\//);
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Meal Planner' })).toBeVisible();
  }

  async getLinks() {
    const links = this.page.getByRole('button');
    return links.all();
  }

  async navigateTo(linkName: string) {
    const link = this.page.getByRole('button', { name: new RegExp(linkName, 'i') });
    await link.click();
  }
}