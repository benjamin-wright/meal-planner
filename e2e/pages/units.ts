import { expect, Page } from "@playwright/test";
import { EditUnitPage } from "./edit-unit";

export class UnitsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async currentPage() {
    await expect(this.page).toHaveURL(/\/units/);
  }

  async goto() {
    await this.page.goto('/units');
    await expect(this.page.getByRole('heading', { name: 'Units' })).toBeVisible();
  }

  getTab(tabName: string) {
    return this.page.getByRole('tab', { name: tabName, selected: true });
  }

  async setTab(tabName: string) {
    const tab = this.page.getByRole('tab', { name: tabName });
    await expect(tab).toBeVisible();
    await tab.click();
    await expect(this.getTab(tabName)).toBeVisible();
  }

  async newUnit() {
    const createButton = this.page.getByRole('button', { name: 'add-button' });
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();

    await createButton.click();

    await expect(this.page).toHaveURL(/\/units\/new/);
    return new EditUnitPage(this.page);
  }

  async listUnits(): Promise<string[]> {
    const headings = this.page.getByTestId('detail-view-group').getByTestId(/detail-view:.*/).getByRole('heading');
    await expect(headings).not.toHaveCount(0);

    const headingElements = await headings.all();
    const contents = await Promise.all(headingElements.map(unit => unit.textContent()));
    return contents.filter(text => text !== null);
  }

  async editUnit(unitName: string) {
    const unitButton = this.page.getByTestId(`detail-view:${unitName}`).getByRole('button');
    await unitButton.click();

    const updateButton = this.page.getByTestId(`detail-view:${unitName}`).getByRole('button', { name: 'edit-link' });
    await expect(updateButton).toHaveCount(1);

    await updateButton.first().click();
    await expect(this.page).toHaveURL(new RegExp(`/units/\\d+`));
    return new EditUnitPage(this.page);
  }
}