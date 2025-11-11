import { expect, Page } from "@playwright/test";

export async function deleteItem(page: Page, name: string) {
  const categoryItem = page.getByLabel(`Slide out controls for ${name}`);
  await expect(categoryItem).toBeVisible();

  // Drag the category item to the right to reveal the edit button and click it
  const box = await categoryItem.boundingBox();
  if (!box) throw new Error('Could not get bounding box for category item');

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 100, startY, { steps: 10 });
  await page.mouse.up();

  const deleteButton = page.getByLabel(`Delete ${name} button`);
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
}

export async function editItem(page: Page, name: string) {
  const itemItem = page.getByLabel(`Slide out controls for ${name}`);
  await expect(itemItem).toBeVisible();

  // Drag the item item to the right to reveal the edit button and click it
  const box = await itemItem.boundingBox();
  if (!box) throw new Error('Could not get bounding box for item item');

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 100, startY, { steps: 10 });
  await page.mouse.up();

  const editButton = page.getByLabel(`Edit ${name} button`);
  await expect(editButton).toBeVisible();
  await editButton.click();
}