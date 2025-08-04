// e2e/categories.spec.ts
import { test, expect } from '@playwright/test';
import { CategoriesPage } from './pages/categories';
import { EditCategoriesPage } from './pages/edit-categories';

test.describe('Categories Page', () => {
  test('default page', async ({ page }) => {
    const categories = new CategoriesPage(page);
    await categories.goto();

    expect(await categories.listCategories()).toEqual(['fruit', 'vegetable', 'bakery', 'meat', 'fish', 'dairy', 'home', 'cupboard', 'drugs']);
  });

  // New test for adding a new category
  test('should add a new category and verify its presence', async ({ page }) => {
    const categoriesAdd = new EditCategoriesPage(page);
    const categoriesList = new CategoriesPage(page);

    // Navigate to the new category page
    await categoriesAdd.goto();

    // Set the name of the new category
    await categoriesAdd.setCategoryName('New Category');

    // Submit the form
    await categoriesAdd.submitForm();

    // Verify that the new category is in the list
    await categoriesList.currentPage();
    const categoryNames = await categoriesList.listCategories();
    expect(categoryNames).toContain('new category');
  });
});