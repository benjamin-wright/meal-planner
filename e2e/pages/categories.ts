import { expect, Page } from "@playwright/test";
import { EditCategoriesPage } from "./edit-categories";

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
    const categoryItems = this.page.locator('.category-item');
    await expect(categoryItems).not.toHaveCount(0);

    const categoryElements = await categoryItems.all();
    const contents = await Promise.all(categoryElements.map(item => item.textContent()));
    return contents.filter(text => text !== null);
  }

  async editCategory(name: string): Promise<EditCategoriesPage> {
    // Find the category item by its name and click it to open the edit page
    const categoryItem = this.page.locator('.category-item', { hasText: name });
    await expect(categoryItem).toBeVisible();

    // Drag the category item to the right to reveal the edit button and click it
    const box = await categoryItem.boundingBox();
    if (!box) throw new Error('Could not get bounding box for category item');

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + 100, startY, { steps: 10 });
    await this.page.mouse.up();

    const editButton = this.page.getByLabel(`Edit ${name} button`);
    await expect(editButton).toBeVisible();
    await editButton.click();

    return new EditCategoriesPage(this.page);
  }

  async dragCategory(from: string, to: string) {
    // Categories can be dragged from any part of the item when in edit mode
    const fromCategory = this.page.locator('.category-item', { hasText: from });
    const toCategory = this.page.locator('.category-item', { hasText: to });

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
    // Find the category item and click its delete button (only visible in edit mode)
    const categoryItem = this.page.locator('.category-item', { hasText: name });
    await expect(categoryItem).toBeVisible();

    // Drag the category item to the right to reveal the edit button and click it
    const box = await categoryItem.boundingBox();
    if (!box) throw new Error('Could not get bounding box for category item');

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX - 100, startY, { steps: 10 });
    await this.page.mouse.up();

    const deleteButton = this.page.getByLabel(`Delete ${name} button`);
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
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