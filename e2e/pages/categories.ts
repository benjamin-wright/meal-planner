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
    const categoryItems = this.page.locator('.category-item-name');
    await expect(categoryItems).not.toHaveCount(0);

    const categoryElements = await categoryItems.all();
    const contents = await Promise.all(categoryElements.map(item => item.textContent()));
    return contents.filter(text => text !== null);
  }

  async editCategory(name: string): Promise<EditCategoriesPage> {
    // Find the category item by its name and click it to open the edit page
    const categoryItem = this.page.locator('.category-item', { hasText: name });
    await expect(categoryItem).toBeVisible();
    await categoryItem.click();

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

  async toggleEditMode() {
    // Click the Edit/Done button in the header
    const editButton = this.page.locator('#header-edit-button');
    await expect(editButton).toBeVisible();
    await editButton.click();
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
    
    const deleteButton = categoryItem.getByLabel('Delete category');
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
  }
}