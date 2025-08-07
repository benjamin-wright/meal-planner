import { expect, Page } from "@playwright/test";

export class EditCategoriesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/categories/new');
    await expect(this.page.getByRole('heading', { name: 'Categories: new' })).toBeVisible();
  }

  async setCategoryName(name: string) {
    const nameInput = this.page.getByRole('textbox', {name: 'name'});
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEditable();
    
    await nameInput.click();
    await this.page.keyboard.press('Control+a');
    await this.page.keyboard.type(name);
  }

  async submitForm() {
    const saveButton = this.page.getByRole('button', { name: 'save-button' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }

  async dragCategory(from: string, to: string) {
    const fromCategory = this.page.locator(`.category-item[data-name="${from}"]`);
    const toCategory = this.page.locator(`.category-item[data-name="${to}"]`);

    await expect(fromCategory).toBeVisible();
    await expect(toCategory).toBeVisible();

    await fromCategory.dragTo(toCategory);
  }
}