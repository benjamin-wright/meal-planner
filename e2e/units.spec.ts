import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home';
import { UnitsPage } from './pages/units';
import { DataPage } from './pages/data';
import { Header } from './pages/header';

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

    await unitsPage.setTab('volume');
    const editUnitPage = await unitsPage.newUnit();
    await editUnitPage.expectNew();

    await editUnitPage.setName('test unit');
    expect(await editUnitPage.getType()).toBe('volume');
    await editUnitPage.save();

    await unitsPage.expectCurrent();
    await unitsPage.expectUnits(['litre', 'test unit']);
  });

  ['weight', 'volume', 'count'].forEach(type => {
    test(`new units of type "${type}" have correct default values`, async ({ page }) => {
      const unitsPage = new UnitsPage(page);
      await unitsPage.goto();
      await unitsPage.setTab(type);

      const editUnitPage = await unitsPage.newUnit();
      await editUnitPage.expectNew();

      expect(await editUnitPage.getType()).toBe(type);
    });
  });

  test('can edit an existing unit', async ({ page }) => {
    const unitsPage = new UnitsPage(page);
    await unitsPage.goto();
    await unitsPage.expandUnit('gram');

    const editUnitPage = await unitsPage.editUnit('gram');
    await editUnitPage.expectExisting('gram');

    expect(await editUnitPage.getName()).toBe('gram');
    expect(await editUnitPage.getType()).toBe('weight');
    expect(await editUnitPage.getMagnitudes()).toEqual([
      { singular: 'milligram', plural: 'milligrams', abbrev: 'mg', multiplier: 0.001 },
      { singular: 'gram', plural: 'grams', abbrev: 'g', multiplier: 1 },
      { singular: 'kilogram', plural: 'kilograms', abbrev: 'kg', multiplier: 1000 },
    ]);

    await editUnitPage.addMagnitude({ singular: 'tonne', plural: 'tonnes', abbrev: 't', multiplier: 1000000 });

    await editUnitPage.setName('edited gram');
    await editUnitPage.save();

    await unitsPage.expectCurrent();
    await unitsPage.expectUnits(['edited gram']);
    await unitsPage.expandUnit('edited gram');
    const details = await unitsPage.getUnitDetails('edited gram');
    expect(details).toEqual([
      ['Abbr.', 'Singular', 'Plural', 'Multiplier'],
      ['mg', 'milligram', 'milligrams', '0.001'],
      ['g', 'gram', 'grams', '1'],
      ['kg', 'kilogram', 'kilograms', '1000'],
      ['t', 'tonne', 'tonnes', '1000000'],
    ]);
  });

  test('can cancel editing an existing unit', async ({ page }) => {
    const header = new Header(page);
    const unitsPage = new UnitsPage(page);

    await unitsPage.goto();
    await unitsPage.expandUnit('gram');

    const editUnitPage = await unitsPage.editUnit('gram');
    await editUnitPage.expectExisting('gram');

    expect(await editUnitPage.getName()).toBe('gram');
    expect(await editUnitPage.getType()).toBe('weight');

    await editUnitPage.setName('edited gram');

    await header.back();

    await unitsPage.expectCurrent();
    await unitsPage.expectUnits(['gram']);
  });
});
