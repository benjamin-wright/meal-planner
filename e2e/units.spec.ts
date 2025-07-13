import { test, expect } from '@playwright/test';
import { UnitsPage } from './pages/units';

test.setTimeout(5000);

test.describe('Units Page', () => {
  test('create a custom unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();

    await expect(units.tab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count']);

    const newUnit = await units.newUnit();

    await newUnit.setName('loaves');
    await newUnit.setType('count');
    await newUnit.newItem();
    await newUnit.newItem();
    await newUnit.setCollective(0, 'loaf', 'loaves', 1);
    await newUnit.setCollective(1, 'slice', 'slices', 10);
    await newUnit.save();

    await units.currentPage();
    await expect(units.tab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count', 'loaves']);
  });
  
  test('edit a custom unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();
    const editPage = await units.editUnit('count');

    expect(await editPage.getFormState()).toEqual({
      name: 'count',
      type: 'count'
    });
    await editPage.setName('counters');
    await editPage.save();

    expect(await units.listUnits()).toEqual(['counters']);
  });
});
