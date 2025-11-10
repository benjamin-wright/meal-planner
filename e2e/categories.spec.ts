import { test, expect } from '@playwright/test';
import { CategoriesPage } from './pages/categories';

// Categories Page Tests
test.describe('Categories Page', () => {
  test('is reachable and lists categories', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    await categoriesPage.currentPage();
    const categories = await categoriesPage.listCategories();
    expect(categories).toEqual([
      'drugs',
      'fruit',
      'vegetable',
      'bakery',
      'meat',
      'fish',
      'dairy',
      'home',
      'cupboard',
    ]);
  });

  test('can edit a category', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    const categories = await categoriesPage.listCategories();
    const firstCategory = categories[0];
    await categoriesPage.editCategory(firstCategory);
    await expect(page.getByRole('heading', { name: 'Edit Category' })).toBeVisible();
  });

  test('can drag and reorder categories', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    
    // Enable edit mode before dragging
    await categoriesPage.toggleSorting();
    
    const categories = await categoriesPage.listCategories();
    if (categories.length > 1) {
      const firstCategory = categories[0];
      const secondCategory = categories[1];

      await categoriesPage.dragCategory(firstCategory, secondCategory);
      
      // Disable edit mode
      await categoriesPage.toggleSorting();

      // Verify the reordering behavior
      const newOrder = await categoriesPage.listCategories();
      expect(newOrder[0]).toBe(secondCategory);
      expect(newOrder[1]).toBe(firstCategory);
    }
  });
});

// Edit Categories Page Tests
test.describe('Edit Categories Page', () => {
  test('can create a new category', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    
    const editPage = await categoriesPage.newCategory();
    await expect(page.getByRole('heading', { name: 'New Category' })).toBeVisible();
    
    await editPage.setCategoryName('Test Category');
    await editPage.submitForm();
    
    // Verify we're back on the categories page and new category appears
    await categoriesPage.currentPage();
    const categories = await categoriesPage.listCategories();
    expect(categories).toContain('test category'); // lowercase due to form input
  });

  test('can edit category name', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    const categories = await categoriesPage.listCategories();
    const firstCategory = categories[0];
    
    const editPage = await categoriesPage.editCategory(firstCategory);
    await expect(page.getByRole('heading', { name: 'Edit Category' })).toBeVisible();
    
    await editPage.setCategoryName('Renamed Category');
    await editPage.submitForm();
    
    // Verify we're back on the categories page and name was updated
    await categoriesPage.currentPage();
    const updatedCategories = await categoriesPage.listCategories();
    expect(updatedCategories).toContain('renamed category'); // lowercase due to form input
    expect(updatedCategories).not.toContain(firstCategory);
  });

  test('can delete a category', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
    const categories = await categoriesPage.listCategories();
    const firstCategory = categories[0];
    
    await categoriesPage.deleteCategory(firstCategory);
    
    // Verify category was deleted
    const updatedCategories = await categoriesPage.listCategories();
    expect(updatedCategories).not.toContain(firstCategory);
  });
});
