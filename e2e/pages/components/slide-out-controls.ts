import { expect, Page } from "@playwright/test";

export async function deleteItem(page: Page, name: string) {
  const item = page.getByLabel(`Slide out controls for ${name}`);
  await expect(item).toBeVisible();

  await item.getByRole('button', { name: 'Delete area' }).click();

  const deleteButton = page.getByLabel(`Delete ${name} button`);
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
}

export async function editItem(page: Page, name: string) {
  const item = page.getByLabel(`Slide out controls for ${name}`);
  await expect(item).toBeVisible();

  await item.getByRole('button', { name: 'Edit area' }).click();

  const editButton = page.getByLabel(`Edit ${name} button`);
  await expect(editButton).toBeVisible();
  await editButton.click();
}
