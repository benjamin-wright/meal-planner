import { expect, Page } from "@playwright/test";
import { EditCategoriesPage } from "./edit-categories";
import { deleteItem, editItem } from "./components/slide-out-controls";

export class CategoriesPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async currentPage() {
    await expect(this.page).toHaveURL(/\/categories/);
  }

  async goto() {
    await this.page.goto('/categories');
    await expect(this.page.getByRole('heading', { name: 'Categories' })).toBeVisible();
  }

  async listCategories(): Promise<string[]> {
    // Categories are rendered as .category-item elements with .category-item-name spans
    const categoryItems = this.page.getByLabel(/Category list item for .*/);
    await expect(categoryItems).not.toHaveCount(0);

    const categoryElements = await categoryItems.all();
    const contents = await Promise.all(categoryElements.map(item => item.textContent()));
    return contents.filter(text => text !== null);
  }

  async editCategory(name: string): Promise<EditCategoriesPage> {
    await editItem(this.page, name);
    return new EditCategoriesPage(this.page);
  }

  async dragCategory(from: string, to: string) {
    // Categories can be dragged from any part of the item when in edit mode
    const fromCategory = this.page.getByLabel(`Category list item for ${from}`);
    const toCategory = this.page.getByLabel(`Category list item for ${to}`);

    await expect(fromCategory).toBeVisible();
    await expect(toCategory).toBeVisible();

    const fromBox = await fromCategory.boundingBox();
    if (!fromBox) throw new Error('Could not get bounding box for fromCategory');

    const toBox = await toCategory.boundingBox();
    if (!toBox) throw new Error('Could not get bounding box for toCategory');

    await this.page.mouse.move(
      fromBox.x + fromBox.width / 2,
      fromBox.y + fromBox.height / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      toBox.x + toBox.width / 2,
      toBox.y + toBox.height / 2,
      { steps: 10 }
    );
    await this.page.mouse.up();
  }

  async toggleSorting() {
    // Click the Sort/Done button in the header
    const sortButton = this.page.locator('#header-sort-button');
    await expect(sortButton).toBeVisible();
    await sortButton.click();
  }

  async newCategory(): Promise<EditCategoriesPage> {
    // Click the add button to create a new category
    const addButton = this.page.locator('#add-category-button');
    await expect(addButton).toBeVisible();
    await addButton.click();

    return new EditCategoriesPage(this.page);
  }

  async deleteCategory(name: string) {
    await deleteItem(this.page, name);
  }

  async confirmDelete() {
    const confirmButton = this.page.getByRole('button', { name: 'Confirm dialog' });
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();

    await confirmButton.click();
  }

  async cancelDelete() {
    const cancelButton = this.page.getByRole('button', { name: 'Cancel dialog' });
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();

    await cancelButton.click();
  }
}