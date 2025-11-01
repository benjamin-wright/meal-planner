import { expect, Page } from "@playwright/test";

export class EditCategoriesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/categories/new');
    await expect(this.page.getByRole('heading', { name: 'New Category' })).toBeVisible();
  }

  async setCategoryName(name: string) {
    // The input has id "category-name-input"
    const nameInput = this.page.locator('#category-name-input');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEditable();
    
    await nameInput.click();
    await nameInput.clear();
    await nameInput.fill(name);
  }

  async submitForm() {
    // The save button has id "confirm-submit-button"
    const saveButton = this.page.locator('#confirm-submit-button');
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}