import { test, expect } from '@playwright/test';

test.describe('Units Page', () => {
  test('create a custom unit', async ({ page }) => {
    await page.goto('/units');
    
    // Check if the page title contains "Units"
    await expect(page.getByRole('heading', { name: 'Units' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Count', selected: true })).toBeVisible();

    const createButton = page.getByRole('button', { name: 'add-button' });
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();

    await createButton.click();
    
    await expect(page).toHaveURL(/\/units\/new/);
  });
  
  test('edit a custom unit', async ({ page }) => {
    await page.goto('/units');

    // Check if the page title contains "Units"
    await expect(page.getByRole('heading', { name: 'Units' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Count', selected: true })).toBeVisible();

    const count = page.getByTestId('detail-view:count').getByRole('button');
    await count.click();

    const updateButton = page.getByTestId('detail-view:count').getByRole('button', { name: 'edit-link' });
    await expect(updateButton).toHaveCount(1);

    await updateButton.first().click();

    await expect(page).toHaveURL(/\/units\/1/);
  });
});
