import { expect, Page } from "@playwright/test";
import { editItem } from "./components/slide-out-controls";
import { EditItemPage } from "./edit-item";

export class ItemsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async currentPage() {
    await expect(this.page).toHaveURL(/\/items/);
  }

  async goto() {
    await this.page.goto('/items');
    await expect(this.page.getByRole('heading', { name: 'Items' })).toBeVisible();
  }

  async waitForListLength(length: number) {
    const itemItems = this.page.getByLabel(/Item list item for .*/);
    await expect(itemItems).toHaveCount(length);
  }

  async listItems(): Promise<string[]> {
    // Items are rendered as .item elements with .item-name spans
    const itemItems = this.page.getByLabel(/Item list item for .*/);
    await expect(itemItems).not.toHaveCount(0);

    const itemElements = await itemItems.all();
    const contents = await Promise.all(itemElements.map(item => item.textContent()));
    return contents.filter(text => text !== null);
  }

  async setFilters({ ingredient, readymeal, misc }: { ingredient?: boolean; readymeal?: boolean; misc?: boolean } = {}) {
    const ingredientCheckbox = this.page.getByLabel('Filter Ingredients');
    const readymealCheckbox = this.page.getByLabel('Filter Ready Meals');
    const miscCheckbox = this.page.getByLabel('Filter Miscellaneous Items');

    if (ingredient) {
      await ingredientCheckbox.check();
    } else {
      await ingredientCheckbox.uncheck();
    }

    if (readymeal) {
      await readymealCheckbox.check();
    } else {
      await readymealCheckbox.uncheck();
    }

    if (misc) {
      await miscCheckbox.check();
    } else {
      await miscCheckbox.uncheck();
    }
  }

  async search(term: string) {
    const searchInput = this.page.getByPlaceholder('search');
    if (!(await searchInput.isEnabled())) {
      await this.page.getByLabel('Toggle Search').click();
    }

    await searchInput.fill(term);
  }

  async cancelSearch() {
    const searchInput = this.page.getByPlaceholder('search');
    if (await searchInput.isEnabled()) {
      await this.page.getByLabel('Toggle Search').click();
    }
  }

  async editItem(itemName: string) {
    await editItem(this.page, itemName);
    return new EditItemPage(this.page);
  }

  async createNewItem() {
    await this.page.getByRole('button', { name: 'Add button' }).click();
    return new EditItemPage(this.page);
  }
}
