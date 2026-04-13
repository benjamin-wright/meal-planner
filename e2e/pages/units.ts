import { expect, Page } from "@playwright/test";
import { EditUnitPage } from "./edit-unit";

export class UnitsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectCurrent() {
    await expect(this.page).toHaveURL(/\/units/);
    await expect(this.page.getByRole('heading', { name: 'Units' })).toBeVisible();
  }

  async goto() {
    await this.page.goto('/units');
    await expect(this.page.getByRole('heading', { name: 'Units' })).toBeVisible();
  }

  async currentTab() {
    const currentTab = this.page.getByRole('tablist').getByRole('tab', { selected: true });
    await expect(currentTab).toHaveCount(1);

    return currentTab.textContent();
  }

  async setTab(tabName: string) {
    const tab = this.page.getByRole('tab', { name: tabName });
    await expect(tab).toBeVisible();
    await tab.click();
    await expect(this.page.getByRole('tablist').getByRole('tab', { name: tabName })).toHaveAttribute('aria-selected', 'true');
  }

  async newUnit() {
    const createButton = this.page.getByRole('button', { name: 'Add button' });
    await expect(createButton).toBeVisible();
    await expect(createButton).toBeEnabled();

    await createButton.click();

    await expect(this.page).toHaveURL(/\/units\/new/);
    return new EditUnitPage(this.page);
  }

  async expectUnits(units: string[]) {
    const buttons = this.page
      .getByRole('listitem', { name: /Collapsible section for/ })
      .getByRole('button', { name: "Toggle section" });

    await expect(buttons).toHaveCount(units.length);
    for (const unit of units) {
      await expect(buttons.filter({ hasText: unit })).toHaveCount(1);
    }
  }

  async expandUnit(unitName: string) {
    const button = this.page
      .getByRole('listitem', { name: `Collapsible section for ${unitName}` })
      .getByRole('button', { name: "Toggle section" });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await button.click();
  }

  async editUnit(unitName: string) {
    const editButton = this.page
      .getByRole('listitem', { name: `Collapsible section for ${unitName}` })
      .getByRole('button', { name: 'Edit unit' });
    await expect(editButton).toBeVisible();
    await expect(editButton).toBeEnabled();

    await editButton.click();

    await expect(this.page).toHaveURL(/\/units\/\d+/);
    return new EditUnitPage(this.page);
  }

  async deleteUnit(unitName: string) {
    const deleteButton = this.page
      .getByRole('listitem', { name: `Collapsible section for ${unitName}` })
      .getByRole('button', { name: 'Delete unit' });
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toBeEnabled();
    await deleteButton.click();
  }
  
  async confirmDelete() {
    const confirmButton = this.page.getByRole('button', { name: 'Confirm dialog' });
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();

    await confirmButton.click();
  }

  async cancelDelete() {
    const cancelButton = this.page.getByRole('button', { name: 'Cancel dialog' });
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();

    await cancelButton.click();
  }

  async getUnitDetails(unitName: string): Promise<string[][]> {
    const unitSection = this.page.getByRole('listitem', { name: `Collapsible section for ${unitName}` }).getByRole('definition');
    await expect(unitSection).toBeVisible();

    const [header, ...rest] = await unitSection.getByRole('table').getByRole('row').all();

    const headerCells = await Promise.all((await header.getByRole('columnheader').all()).map(async cell => (await cell.textContent()) || ''));
    const body = await Promise.all(rest.map(async row => {
      return Promise.all((await row.getByRole('cell').all()).map(async cell => (await cell.textContent()) || ''));
    }));

    return [headerCells, ...body];
  }
}
