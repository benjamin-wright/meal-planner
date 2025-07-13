import { test, expect } from '@playwright/test';
import { CategoriesPage } from './pages/categories';

test.setTimeout(5000);

test.describe('Categories Page', () => {
  test('default page', async ({ page }) => {
    const categories = new CategoriesPage(page);
    await categories.goto();

    expect(await categories.listCategories()).toEqual(['fruit', 'vegetable', 'bakery', 'meat', 'fish', 'dairy', 'home', 'cupboard', 'drugs']);
  });
});
