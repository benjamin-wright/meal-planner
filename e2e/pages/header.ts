import { expect, Page } from "@playwright/test";

export class Header {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async back() {
    const backButton = this.page.getByRole('button', { name: 'Nav back' });
    await expect(backButton).toBeVisible();
    await backButton.click();
  }
}