import { expect, Page } from "@playwright/test";
import { editItem } from "./components/slide-out-controls";

export class RecipiesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/recipies');
    await expect(this.page.getByRole('heading', { name: 'Recipies' })).toBeVisible();
  }

  async expectCurrent() {
    await expect(this.page).toHaveURL(/\/recipies/);
  }

  async listRecipes(): Promise<string[]> {
    const items = this.page.getByLabel(/Recipe list item for .*/);
    await expect(items).not.toHaveCount(0);
    const all = await items.all();
    return Promise.all(all.map(el => el.textContent())).then(texts => texts.filter((t): t is string => t !== null));
  }

  async editRecipe(name: string) {
    await editItem(this.page, name);
    const editPage = new RecipeEditPage(this.page);
    await editPage.expectLoaded(name);
    return editPage;
  }

  async createNewRecipe() {
    await this.page.getByLabel('Add button').click();
    const editPage = new RecipeEditPage(this.page);
    await expect(this.page).toHaveURL('/recipies/new');
    return editPage;
  }
}

export class RecipeEditPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(name: string) {
    await expect(this.page.getByRole('heading', { name: `Recipe: ${name}` })).toBeVisible();
  }

  async getIngredients(): Promise<{ name: string; quantity: string }[]> {
    const nameButtons = this.page.locator('button.ingredient-name-button');
    const quantityButtons = this.page.locator('button.ingredient-quantity');

    const count = await nameButtons.count();
    const result: { name: string; quantity: string }[] = [];
    for (let i = 0; i < count; i++) {
      const name = await nameButtons.nth(i).textContent() ?? '';
      const quantity = await quantityButtons.nth(i).textContent() ?? '';
      result.push({ name: name.trim(), quantity: quantity.trim() });
    }
    return result;
  }

  async openIngredientSelector(index: number) {
    const buttons = this.page.locator('button.ingredient-name-button');
    await buttons.nth(index).click();
    await expect(this.page.getByRole('heading', { name: new RegExp(`Ingredient ${index + 1}`) })).toBeVisible();
  }

  async openQuantitySelector(index: number) {
    const buttons = this.page.locator('button.ingredient-quantity');
    await buttons.nth(index).click();
    await expect(this.page.getByRole('heading', { name: new RegExp(`Quantity ${index + 1}`) })).toBeVisible();
  }

  async selectIngredient(name: string) {
    const label = this.page.getByText(name, { exact: true });
    await label.click();
  }

  async setQuantityValue(value: number) {
    const input = this.page.getByLabel('Quantity');
    await input.fill(value.toString());
    await input.blur();
  }

  async selectUnitMagnitude(label: string) {
    const option = this.page.getByText(label, { exact: true });
    await option.click();
  }

  async confirmPopup() {
    await this.page.getByLabel('Confirm popup').click();
  }

  async cancelPopup() {
    await this.page.getByLabel('Cancel popup').click();
  }

  async clickNewIngredient() {
    // The AddButton inside the ingredient selector popup
    await this.page.getByLabel('Add button').last().click();
  }

  async clickNewUnit() {
    // The AddButton inside the quantity selector popup
    await this.page.getByLabel('Add button').last().click();
  }

  async save() {
    await this.page.getByRole('button', { name: 'SAVE' }).click();
  }
}
