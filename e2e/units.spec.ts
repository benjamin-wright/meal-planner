import { Experimental_CssVarsProvider } from '@mui/material';
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

    const nameInput = page.getByLabel('Name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEditable();

    await nameInput.fill('loaves');

    const typeSelect = page.getByLabel('Type');
    await expect(typeSelect).toBeVisible();
    await expect(typeSelect).toBeEditable();
    await expect(typeSelect).toHaveText('count');

    await page.getByRole('button', { name: 'new-item-button' }).click();

    const singularInput = page.getByLabel('Singular');
    await expect(singularInput).toBeVisible();
    await expect(singularInput).toBeEditable(); 

    await singularInput.fill('loaf');

    const pluralInput = page.getByLabel('Plural');
    await expect(pluralInput).toBeVisible();
    await expect(pluralInput).toBeEditable(); 

    await pluralInput.fill('loaves');

    const saveButton = page.getByRole('button', { name: 'save-button' });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await expect(page).toHaveURL(/\/units/);
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
