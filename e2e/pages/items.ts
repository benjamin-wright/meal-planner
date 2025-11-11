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

  async listItems(): Promise<string[]> {
    // Items are rendered as .item elements with .item-name spans
    const itemItems = this.page.getByLabel(/Item list item for .*/);
    await expect(itemItems).not.toHaveCount(0);

    const itemElements = await itemItems.all();
    const contents = await Promise.all(itemElements.map(item => item.textContent()));
    return contents.filter(text => text !== null);
  }

  async editItem(itemName: string) {
    await editItem(this.page, itemName);
    return new EditItemPage(this.page);
  }
}