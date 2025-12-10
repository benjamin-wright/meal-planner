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
    const editPage = await itemsPage.editItem(firstItem);

    // Verify that we are on the Edit Item page
    await expect(page).toHaveURL('/items/1');
    await expect(page.getByRole('heading', { name: `Item: ${firstItem}` })).toBeVisible();

    // Change the item details
    const newName = 'red onions';
    await editPage.setName(newName);
    await editPage.selectCategory('bakery');
    await editPage.selectKind('Misc');
    await editPage.save();

    // Verify that we are back on the Items page and the name has been updated
    await expect(page).toHaveURL('/items');

    await itemsPage.setFilters({ misc: true });
    await itemsPage.waitForListLength(2); // Expecting 2 misc items now

    const updatedItems = await itemsPage.listItems();
    expect(updatedItems).toEqual(["red onions", "shampoo"]);

    await itemsPage.setFilters({}); // Reset filters

    //Todo filter by "bakery" category and verify the item is listed there
  });
});
