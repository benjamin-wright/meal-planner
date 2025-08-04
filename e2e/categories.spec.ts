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
    const categoriesEdit = new EditCategoriesPage(page);
    const categoriesList = new CategoriesPage(page);

    // Navigate to the new category page
    await categoriesEdit.goto();

    // Set the name of the new category
    await categoriesEdit.setCategoryName('New Category');

    // Submit the form
    await categoriesEdit.submitForm();

    // Verify that the new category is in the list
    await categoriesList.currentPage();
    const categoryNames = await categoriesList.listCategories();
    expect(categoryNames).toContain('new category');
  });

  test('should rename an existing category', async ({ page }) =>  {
    const categoriesList = new CategoriesPage(page);

    // Go to the main list page, click on the edit button for 'fruit'
    await categoriesList.goto();
    const categoriesEdit =  await categoriesList.clickCategory('fruit');

    // Set the new category name
    await categoriesEdit.setCategoryName('New Fruit');
    // Submit the form
    await categoriesEdit.submitForm();

    // Verify that the new category is in the
    // list and the old one is not
    await categoriesList.currentPage();
    const categoryNames = await categoriesList.listCategories();
    await expect(categoryNames).toContain('new fruit');
    await expect(categoryNames).not.toContain('fruit');
  });
});