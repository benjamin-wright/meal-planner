import { test, expect } from '@playwright/test';
import { ItemsPage } from './pages/items';

// Items Page Tests
test.describe('Items Page', () => {
  test('is reachable and lists categories', async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();
    await itemsPage.currentPage();
    const items = await itemsPage.listItems();
    expect(items).toEqual([
      "onions",
      "potatoes",
      "bread",
      "chicken",
      "salmon",
      "milk",
      "eggs",
      "shampoo",
      "pasta pot",
    ]);
  });

  test('can edit an item', async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();
    const items = await itemsPage.listItems();
    const firstItem = items[0];
    await itemsPage.editItem(firstItem);

    // Verify that we are on the Edit Item page
    await expect(page).toHaveURL('/items/1');
    await expect(page.getByRole('heading', { name: `Item: ${firstItem}` })).toBeVisible();
  });
});