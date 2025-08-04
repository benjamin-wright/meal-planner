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
    return this.page.getByRole('combobox', { name: 'type' }).textContent();
  }

  async setType(value: string) {
    const typeSelect = this.page.getByRole('combobox', { name: 'type' });
    await expect(typeSelect).toBeVisible();
    await expect(typeSelect).toBeEditable();

    await typeSelect.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async getBase() {
    return this.page.getByRole('textbox', {name: 'base'}).textContent().then(value => value ? parseFloat(value) : undefined);
  }

  async setBase(value: number) {
    const baseInput = this.page.getByRole('textbox', {name: 'base'});
    await expect(baseInput).toBeVisible();
    await expect(baseInput).toBeEditable();

    await baseInput.fill(value.toString());
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

  async setMagnitude(index: number, singular: string, plural: string, abbrev: string, multiplier: number) {
    const magnitudeInput = this.page.getByTestId(`magnitude-${index}`);
    const singularInput = magnitudeInput.getByLabel('Singular');
    await expect(singularInput).toBeVisible();
    await expect(singularInput).toBeEditable(); 
    await singularInput.fill(singular);

    const pluralInput = magnitudeInput.getByLabel('Plural');
    await expect(pluralInput).toBeVisible();
    await expect(pluralInput).toBeEditable();
    await pluralInput.fill(plural);

    const abbrevInput = magnitudeInput.getByLabel('Abbreviation');
    await expect(abbrevInput).toBeVisible();
    await expect(abbrevInput).toBeEditable();
    await abbrevInput.fill(abbrev);

    const multiplierInput = magnitudeInput.getByLabel('Multiplier');
    await expect(multiplierInput).toBeVisible();
    await expect(multiplierInput).toBeEditable();
    await multiplierInput.fill(multiplier.toString());
  }

  async getFormState(): Promise<FormState> {
    const name = await this.getName() || '';
    const type = await this.getType() || '';
    const base = type === 'count' ? undefined : await this.getBase();
    
    return { name, type, base };
  }

  async setFormState(state: FormState) {
    if (state.collectives && state.collectives.length > 0) {
      for (let i = 0; i < state.collectives.length; i++) {
        await this.newItem();
      }
    }

    if (state.magnitudes && state.magnitudes.length > 0) {
      for (let i = 0; i < state.magnitudes.length; i++) {
        await this.newItem();
      }
    }

    await this.setName(state.name);
    await this.setType(state.type);

    if (state.base !== undefined && state.type !== 'count') {
      await this.setBase(state.base);
    }

    if (state.collectives) {
      for (let i = 0; i < state.collectives.length; i++) {
        await this.setCollective(i, state.collectives[i].singular, state.collectives[i].plural, state.collectives[i].multiplier);
      }
    }

    if (state.magnitudes) {
      for (let i = 0; i < state.magnitudes.length; i++) {
        await this.setMagnitude(i, state.magnitudes[i].singular, state.magnitudes[i].plural, state.magnitudes[i].abbrev, state.magnitudes[i].multiplier);
      }
    }
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'save-button' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}