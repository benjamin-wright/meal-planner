import { test, expect } from '@playwright/test';
import { UnitsPage } from './pages/units';

test.setTimeout(5000);

test.describe('Units Page', () => {
  test('create a custom count unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();

    await expect(units.getTab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count']);

    const newUnit = await units.newUnit();

    expect(await newUnit.getFormState()).toEqual({
      name: '',
      type: 'count'
    });

    await newUnit.setName('loaves');
    await newUnit.setType('count');
    await newUnit.newItem();
    await newUnit.newItem();
    await newUnit.setCollective(0, 'loaf', 'loaves', 1);
    await newUnit.setCollective(1, 'slice', 'slices', 10);
    await newUnit.save();

    await units.currentPage();
    await expect(units.getTab('Count')).toBeVisible();
    expect(await units.listUnits()).toEqual(['count', 'loaves']);
  });

  test('create a custom weight unit', async ({ page }) => {
    const units = new UnitsPage(page);
    await units.goto();

    await expect(units.getTab('Count')).toBeVisible();
    await units.setTab('Weight');
    expect(await units.listUnits()).toEqual(['gram (default)']);

    const newUnit = await units.newUnit();

    expect(await newUnit.getFormState()).toEqual({
      name: '',
      type: 'weight'
    });

    await newUnit.setName('pounds');
    await newUnit.setType('weight');
    await newUnit.setBase(453.59237);
    await newUnit.newItem();
    await newUnit.setMagnitude(0, 'pound', 'pounds', 'lb', 1);
    await newUnit.save();

    await units.currentPage();
    await expect(units.getTab('Weight')).toBeVisible();
    expect(await units.listUnits()).toEqual(['gram (default)', 'pounds']);
  });
  
  test('edit a unit', async ({ page }) => {
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
