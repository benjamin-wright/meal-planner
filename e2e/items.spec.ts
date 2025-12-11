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
    expect(updatedItems).toEqual(['red onions', 'shampoo']);

    await itemsPage.setFilters({}); // Reset filters
    await itemsPage.waitForListLength(9); // Back to 9 items

    await itemsPage.search('bakery');
    await itemsPage.waitForListLength(3);

    const bakeryItems = await itemsPage.listItems();
    expect(bakeryItems).toEqual(['red onions', 'bread', 'eggs']);

    await itemsPage.cancelSearch();
    await itemsPage.waitForListLength(9); // Back to 9 items
  });

  test('can create a new ingredient', async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();
    const initialItems = await itemsPage.listItems();
    const initialCount = initialItems.length;

    const newItemPage = await itemsPage.createNewItem();

    // Verify that we are on the Edit Item page for a new item
    await expect(page).toHaveURL('/items/new');
    await expect(page.getByRole('heading', { name: 'Item: New' })).toBeVisible();

    // Fill in the new item details
    const itemName = 'banana';
    await newItemPage.setName(itemName);
    await newItemPage.selectCategory('fruit');
    await newItemPage.selectKind('Ingredient');
    await newItemPage.save();

    // Verify that we are back on the Items page and the new item is listed
    await expect(page).toHaveURL('/items');

    await itemsPage.search('banana');
    await itemsPage.waitForListLength(1);

    const newItems = await itemsPage.listItems();
    expect(newItems).toEqual([itemName]);

    // Verify the total count has increased by 1
    await itemsPage.cancelSearch();
    await itemsPage.waitForListLength(initialCount + 1);

    // Open the edit page for the new item to verify details
    const editPage = await itemsPage.editItem(itemName);
    await expect(editPage.getName()).resolves.toBe(itemName);
    await expect(editPage.getCategory()).resolves.toBe('fruit');
    await expect(editPage.getKind()).resolves.toBe('Ingredient');
  });

  test('can create a new ready meal', async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();
    const initialItems = await itemsPage.listItems();
    const initialCount = initialItems.length;

    const newItemPage = await itemsPage.createNewItem();

    // Verify that we are on the Edit Item page for a new item
    await expect(page).toHaveURL('/items/new');
    await expect(page.getByRole('heading', { name: 'Item: New' })).toBeVisible();

    // Fill in the new item details
    const itemName = 'chicken curry';
    await newItemPage.setName(itemName);
    await newItemPage.selectCategory('cupboard');
    await newItemPage.selectKind('Readymeal');
    await newItemPage.selectCourse('Lunch');
    await newItemPage.selectDishType('Main');
    await newItemPage.setServings(2);
    await newItemPage.setTime(3);
    await newItemPage.save();

    // Verify that we are back on the Items page and the new item is listed
    await expect(page).toHaveURL('/items');

    await itemsPage.search('chicken curry');
    await itemsPage.waitForListLength(1);

    const newItems = await itemsPage.listItems();
    expect(newItems).toEqual([itemName]);

    // Verify the total count has increased by 1
    await itemsPage.cancelSearch();
    await itemsPage.waitForListLength(initialCount + 1);

    // Open the edit page for the new item to verify details
    const editPage = await itemsPage.editItem(itemName);
    await expect(page).toHaveURL('/items/' + (initialCount + 1).toString());
    await expect(page.getByRole('heading', { name: 'Item: ' + itemName })).toBeVisible();

    await expect(editPage.getName()).resolves.toBe(itemName);
    await expect(editPage.getCategory()).resolves.toBe('cupboard');
    await expect(editPage.getKind()).resolves.toBe('Readymeal');
    await expect(editPage.getCourse()).resolves.toBe('Lunch');
    await expect(editPage.getDishType()).resolves.toBe('Main');
    await expect(editPage.getServings()).resolves.toBe(2);
    await expect(editPage.getTime()).resolves.toBe(3);
  });
});
