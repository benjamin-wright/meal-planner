import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home';
import { UnitsPage } from './pages/units';
import { DataPage } from './pages/data';

test.describe('Units Page', () => {
  test('reachable from the main menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.navigateTo('data');

    const dataPage = new DataPage(page);
    await dataPage.expectCurrent();
    await dataPage.navigateTo('units');

    const unitsPage = new UnitsPage(page);
    await unitsPage.expectCurrent();
  });

  test('has the right content', async ({ page }) => {
    const unitsPage = new UnitsPage(page);
    await unitsPage.goto();

    expect(await unitsPage.currentTab()).toBe('weight');
    await unitsPage.expectUnits(['gram']);

    await unitsPage.setTab('volume');
    await unitsPage.expectUnits(['litre']);

    await unitsPage.setTab('count');
    await unitsPage.expectUnits(['count']);
  });

  test('can expand unit details', async ({ page }) => {
    const unitsPage = new UnitsPage(page);
    await unitsPage.goto();

    await unitsPage.expandUnit('gram');
    const details = await unitsPage.getUnitDetails('gram');
    expect(details).toEqual([
      ['Abbr.', 'Singular', 'Plural', 'Multiplier'],
      ['mg', 'milligram', 'milligrams', '0.001'],
      ['g', 'gram', 'grams', '1'],
      ['kg', 'kilogram', 'kilograms', '1000'],
    ]);

    await unitsPage.setTab('volume');
    await unitsPage.expandUnit('litre');
    const volumeDetails = await unitsPage.getUnitDetails('litre');
    expect(volumeDetails).toEqual([
      ['Abbr.', 'Singular', 'Plural', 'Multiplier'],
      ['ml', 'millilitre', 'millilitres', '0.001'],
      ['l', 'litre', 'litres', '1'],
    ]);

    await unitsPage.setTab('count');
    await unitsPage.expandUnit('count');
    const countDetails = await unitsPage.getUnitDetails('count');
    expect(countDetails).toEqual([
      ['Singular', 'Plural'],
      ['N/A', 'N/A'],
    ]);
  });

  test('can create a new unit', async ({ page }) => {
    const unitsPage = new UnitsPage(page);
    await unitsPage.goto();

    const editUnitPage = await unitsPage.newUnit();
    await editUnitPage.expectNew();

    await editUnitPage.setName('test unit');
  });
});
