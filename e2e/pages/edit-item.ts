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

  async setName(name: string) {
    const nameInput = this.page.getByLabel('Item Name');
    await nameInput.fill(name);
  }

  async selectCategory(category: string) {
    const categorySelect = this.page.getByLabel('Item Category');
    await categorySelect.selectOption({ label: category });
  }

  async selectKind(kind: string) {
    const kindSelect = this.page.getByLabel('Item Kind');
    await kindSelect.selectOption({ label: kind });
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}
