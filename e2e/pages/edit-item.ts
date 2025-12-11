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

  async getName(): Promise<string> {
    const nameInput = this.page.getByLabel('Item Name');
    return await nameInput.inputValue();
  }

  async selectCategory(category: string) {
    const categorySelect = this.page.getByLabel('Item Category');
    await categorySelect.selectOption({ label: category });
  }

  async getCategory(): Promise<string> {
    const categorySelect = this.page.getByLabel('Item Category');
    const selectedOption = await categorySelect.inputValue();
    return selectedOption;
  }

  async selectKind(kind: string) {
    const kindSelect = this.page.getByLabel('Item Kind');
    await kindSelect.selectOption({ label: kind });
  }

  async getKind(): Promise<string> {
    const kindSelect = this.page.getByLabel('Item Kind');
    const selectedOption = await kindSelect.inputValue();
    return selectedOption;
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}
