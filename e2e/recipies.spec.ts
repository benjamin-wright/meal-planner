import { test, expect } from '@playwright/test';
import { RecipiesPage } from './pages/recipies';

test.describe('Recipies Page', () => {
  test('is reachable and lists recipes', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const recipes = await recipiesPage.listRecipes();
    expect(recipes).toContain('potato salad');
  });

  test('can view recipe ingredients', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    const ingredients = await editPage.getIngredients();
    expect(ingredients).toEqual([
      { name: 'potatoes', quantity: '500 grams' },
      { name: 'onions', quantity: '200 grams' },
    ]);
  });

  test('can change ingredient quantity', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openQuantitySelector(0);
    await editPage.setQuantityValue(750);
    await editPage.confirmPopup();

    const ingredients = await editPage.getIngredients();
    expect(ingredients[0].quantity).toBe('750 grams');
  });

  test('can change ingredient unit magnitude', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openQuantitySelector(0);
    await editPage.selectUnitMagnitude('gram – kg');
    await editPage.setQuantityValue(0.5);
    await editPage.confirmPopup();

    const ingredients = await editPage.getIngredients();
    expect(ingredients[0].quantity).toBe('500 grams');
  });

  test('can cancel editing quantity', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openQuantitySelector(0);
    await editPage.setQuantityValue(999);
    await editPage.cancelPopup();

    const ingredients = await editPage.getIngredients();
    expect(ingredients[0].quantity).toBe('500 grams');
  });

  test('can change ingredient selection', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openIngredientSelector(1);
    await editPage.selectIngredient('chicken');
    await editPage.confirmPopup();

    const ingredients = await editPage.getIngredients();
    expect(ingredients[1].name).toBe('chicken');
  });

  test('add ingredient button navigates to new item page', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openIngredientSelector(0);
    await editPage.clickNewIngredient();

    await expect(page).toHaveURL('/items/new');
  });

  test('add unit button navigates to new unit page', async ({ page }) => {
    const recipiesPage = new RecipiesPage(page);
    await recipiesPage.goto();
    const editPage = await recipiesPage.editRecipe('potato salad');

    await editPage.openQuantitySelector(0);
    await editPage.clickNewUnit();

    await expect(page).toHaveURL('/units/new');
  });
});
