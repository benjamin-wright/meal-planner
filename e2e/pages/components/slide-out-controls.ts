import { expect, Page } from "@playwright/test";

export async function deleteItem(page: Page, name: string) {
  await page.getByRole('button', { name: `Delete ${name} area` }).click();

  const deleteButton = page.getByLabel(`Delete ${name} button`);
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
}

export async function editItem(page: Page, name: string) {
  await page.getByRole('button', { name: `Edit ${name} area` }).click();

  const editButton = page.getByLabel(`Edit ${name} button`);
  await expect(editButton).toBeVisible();
  await editButton.click();
}
