import { test, expect } from '@playwright/test';
import { UnitsPage } from './pages/units';

test.describe('Units Page', () => {
  test('create a custom unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();

    await expect(units.tab('Count')).toBeVisible();
    expect(await units.listUnits(1)).toEqual(['count']);

    const newUnit = await units.newUnit();

    await newUnit.setName('loaves');
    await newUnit.setType('count');
    await newUnit.newItem();
    await newUnit.setCollective(0, 'loaf', 'loaves');
    await newUnit.save();

    await units.currentPage();
    await expect(units.tab('Count')).toBeVisible();
    expect(await units.listUnits(2)).toEqual(['count', 'loaves']);
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
