import { expect, Page } from "@playwright/test";

export class EditItemPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/items/edit');
    await expect(this.page.getByRole('heading', { name: 'Edit Item' })).toBeVisible();
  }
}