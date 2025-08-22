import { Locator, Page } from "@playwright/test";

export class listPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPage() {
    await this.page.goto("/");
  }

  async addNewItemToList(listName: string) {
    let addNewItemButton = this.page.getByTestId(`${listName}-add-new-item`);  
    await addNewItemButton.click();
  }
  
  async getListItemValues(listName: string): Promise<string[]> {
    let listId: string = (await this.page
      .locator(`table[data-testlist-name="${listName}"]`)
      .getAttribute("data-testid")) as string;
    let listItems = await Promise.all(
      (
        await this.page.getByTestId(`${listName}-item-name`).all()
      ).map((e) => e.getAttribute("value"))
    );

    return listItems as string[];
  }

  async getCheckboxStates(listName: string): Promise<boolean[]> {
    let listId: string = (await this.page
      .locator(`table[data-testlist-name="${listName}"]`)
      .getAttribute("data-testid")) as string;
    let checkboxStates = await Promise.all(
      (
        await this.page.locator(`input[type="checkbox"][id="${listId}"]`).all()
      ).map((e) => e.isChecked())
    );

    return checkboxStates as boolean[];
  }

  getListItemInputLocatorByValue(listName: string, value: string): Locator {
    return this.page
      .locator(`input[value="${value}"][data-testid="${listName}-item-name"]`)
      .first();
  }

  async getListItemInputLocator(
    listName: string, value: string
  ): Promise<Locator> {
    let itemInputLocator = this.getListItemInputLocatorByValue(
        listName,
        ""
      );
    let inputDataName = await itemInputLocator.getAttribute("data-name");
    return this.page
      .locator(`input[type="text"][data-name="${inputDataName}"]`)
      .first();
  }

  async getCheckboxItemLocatorByInputLocator(inputLocator: Locator): Promise<Locator> {
    let inputDataName = await inputLocator.getAttribute("data-name");
    return this.page
      .locator(`input[type="checkbox"][data-name="${inputDataName}"]`)
      .first();
  }

  async getRemoveButtonLocatorByInputLocator(inputLocator: Locator): Promise<Locator> {
    let inputDataName = await inputLocator.getAttribute("data-name");
    return this.page.locator(`button[data-name="${inputDataName}"]`).first();
  }
}
