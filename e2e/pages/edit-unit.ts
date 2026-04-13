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

export type Magnitude = {
  singular: string;
  plural: string;
  abbrev: string;
  multiplier: number;
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

  async getMagnitudes() {
    const magnitudeElements = this.page.getByLabel(/^magnitude-\d+/);
    const count = await magnitudeElements.count();
    const magnitudes = [];

    for (let i = 0; i < count; i++) {
      const magnitudeElement = magnitudeElements.nth(i);
      const abbrev = await magnitudeElement.getByLabel('Abbreviation').inputValue();
      const singular = await magnitudeElement.getByLabel('Singular').inputValue();
      const plural = await magnitudeElement.getByLabel('Plural').inputValue();
      const multiplierStr = await magnitudeElement.getByLabel('Multiplier').inputValue();
      const multiplier = parseFloat(multiplierStr);

      magnitudes.push({ singular, plural, abbrev, multiplier });
    }

    return magnitudes;
  }

  async addMagnitude(magnitude: { abbrev: string, singular: string, plural: string, multiplier?: number }) {
    const addButton = this.page.getByRole('button', { name: 'Add button' });
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

    const newMagnitudeElements = this.page.getByLabel(/^magnitude-\d+/);
    const newMagnitudeElement = newMagnitudeElements.nth(-1);
    await newMagnitudeElement.getByLabel('Abbreviation').fill(magnitude.abbrev);
    await newMagnitudeElement.getByLabel('Singular').fill(magnitude.singular);
    await newMagnitudeElement.getByLabel('Plural').fill(magnitude.plural);
    if (magnitude.multiplier) {
      await newMagnitudeElement.getByLabel('Multiplier').fill(magnitude.multiplier.toString());
    }
  }

  async setMagnitude(abbrev: string, magnitude: { abbrev: string, singular: string, plural: string, multiplier?: number }) {
    const magnitudeElements = this.page.getByLabel(/^magnitude-\d+/);
    const count = await magnitudeElements.count();

    for (let i = 0; i < count; i++) {
      const magnitudeElement = magnitudeElements.nth(i);
      const currentAbbrev = await magnitudeElement.getByLabel('Abbreviation').inputValue();

      if (currentAbbrev === abbrev) {
        await magnitudeElement.getByLabel('Abbreviation').fill(magnitude.abbrev);
        await magnitudeElement.getByLabel('Singular').fill(magnitude.singular);
        await magnitudeElement.getByLabel('Plural').fill(magnitude.plural);
        if (magnitude.multiplier) {
          await magnitudeElement.getByLabel('Multiplier').fill(magnitude.multiplier.toString());
        }
        return;
      }
    }

    throw new Error(`Magnitude with abbreviation "${abbrev}" not found`);
  }

  async toggleDelete() {
    const enableDeleteButton = this.page.getByRole('button', { name: 'Delete button' });
    await expect(enableDeleteButton).toBeVisible();
    await expect(enableDeleteButton).toBeEnabled();
    await enableDeleteButton.click();
  }

  async deleteMagnitude(abbrev: string) {
    const magnitudeElements = this.page.getByLabel(/^magnitude-\d+/);
    const count = await magnitudeElements.count();

    for (let i = 0; i < count; i++) {
      const magnitudeElement = magnitudeElements.nth(i);
      const currentAbbrev = await magnitudeElement.getByLabel('Abbreviation').inputValue();

      if (currentAbbrev === abbrev) {
        const deleteButton = magnitudeElement.getByRole('button', { name: 'Delete overlay' });
        await expect(deleteButton).toBeVisible();
        await expect(deleteButton).toBeEnabled();

        await deleteButton.click();
        return;
      }
    }

    throw new Error(`Magnitude with abbreviation "${abbrev}" not found`);
  }

  async save() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();
  }
}
