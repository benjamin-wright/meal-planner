import { expect, Page } from "@playwright/test";

export class CategoriesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async currentPage() {
    await expect(this.page).toHaveURL(/\/categories/);
  }

  async goto() {
    await this.page.goto('/categories');
    await expect(this.page.getByRole('heading', { name: 'Categories' })).toBeVisible();
  }

  async listCategories(): Promise<string[]> {
    const headings = this.page.getByTestId(/detail-view:.*/).getByRole('heading');
    await expect(headings).not.toHaveCount(0);

    const headingElements = await headings.all();
    const contents = await Promise.all(headingElements.map(unit => unit.textContent()));
    return contents.filter(text => text !== null);
  }
}