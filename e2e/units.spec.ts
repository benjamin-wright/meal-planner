import { test, expect } from '@playwright/test';
import { UnitsPage } from './pages/units';

test.describe('Units Page', () => {
  test('create a custom count unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();

    await expect(units.getTab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count']);

    const newUnit = await units.newUnit();

    await newUnit.setFormState({
      name: 'loaves',
      type: 'count',
      collectives: [
        { singular: 'loaf', plural: 'loaves', multiplier: 1 },
        { singular: 'slice', plural: 'slices', multiplier: 10 }
      ]
    });
    await newUnit.save();

    await units.currentPage();
    await expect(units.getTab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count', 'loaves']);
  });

  test('create a custom weight unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();
    await units.setTab('Weight');
    expect(await units.listUnits()).toEqual(['gram (default)']);

    const newUnit = await units.newUnit();
    await newUnit.setFormState({
      name: 'pounds',
      type: 'weight',
      base: 453.59237,
      magnitudes: [
        { singular: 'pound', plural: 'pounds', abbrev: 'lb', multiplier: 1 }
      ]
    });
    await newUnit.save();

    await units.currentPage();
    await expect(units.getTab('Weight')).toBeVisible();
    expect(await units.listUnits()).toEqual(['gram (default)', 'pounds']);
  });

  test('edit a unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();
    const editPage = await units.editUnit('count');

    await editPage.setFormState({
      name: 'counters',
      type: 'count'
    });
    await editPage.save();

    expect(await units.listUnits()).toEqual(['counters']);
  });
});
