import { expect, Page } from "@playwright/test";

type FormState = {
  name: string;
  type: string;
  base?: number;
  collectives?: {
    singular: string;
    plural: string;
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
    return this.page.getByLabel('type').first().textContent();
  }

  async setType(value: string) {
    const typeSelect = this.page.getByLabel('Type');
    await expect(typeSelect).toBeVisible();
    await expect(typeSelect).toBeEditable();

    await typeSelect.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async getBase() {
    return this.page.getByLabel('Base').first().textContent().then(value => value ? parseFloat(value) : undefined);
  }

  async newItem() {
    return this.page.getByRole('button', { name: 'new-item-button' }).click();
  }

  async setCollective(index: number, singular: string, plural: string, multiplier?: number) {
    const collectiveInput = this.page.getByTestId(`collective-${index}`);

    const singularInput = collectiveInput.getByLabel('Singular');
    await expect(singularInput).toBeVisible();
    await expect(singularInput).toBeEditable(); 

    await singularInput.fill(singular);

    const pluralInput = collectiveInput.getByLabel('Plural');
    await expect(pluralInput).toBeVisible();
    await expect(pluralInput).toBeEditable();

    await pluralInput.fill(plural);

    if (multiplier !== undefined) {
      const multiplierInput = collectiveInput.getByLabel('Multiplier');
      await expect(multiplierInput).toBeVisible();
      await expect(multiplierInput).toBeEditable();
      await multiplierInput.fill(multiplier.toString());
    }
  }

  async getFormState(): Promise<FormState> {
    const name = await this.getName() || '';
    const type = await this.getType() || '';
    const base = type === 'count' ? undefined : await this.getBase();
    
    return { name, type, base };
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'save-button' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}