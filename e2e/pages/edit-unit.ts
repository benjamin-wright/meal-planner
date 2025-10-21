import { expect, Page } from "@playwright/test";

export type FormState = {
  name: string;
  type: string;
  base?: number;
  collectives?: {
    singular: string;
    plural: string;
    multiplier?: number;
  }[],
  magnitudes?: {
    singular: string;
    plural: string;
    abbrev: string;
    multiplier: number;
  }[]
}

export class EditUnitPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectNew() {
    await expect(this.page.getByRole('heading', { name: 'Unit: New' })).toBeVisible();
  }

  async expectExisting(unitName: string) {
    await expect(this.page.getByRole('heading', { name: `Unit: ${unitName}` })).toBeVisible();
  }

  async getName() {
    return this.page.getByLabel('Name').first().inputValue();
  }

  async setName(value: string) {
    const nameInput = this.page.getByLabel('Name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEditable();

    await nameInput.fill(value);
  }

  async getType() {
    return this.page.getByLabel('Type').inputValue();
  }

  async setType(value: string) {
    const typeInput = this.page.getByLabel('Type');
    await expect(typeInput).toBeVisible();
    await expect(typeInput).toBeEnabled();

    await typeInput.selectOption(value);
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}
