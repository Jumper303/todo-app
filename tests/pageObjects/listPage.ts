import { Locator, Page } from "@playwright/test";

export class listPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPage() {
    await this.page.goto("/");
  }

  async addNewItemToList(listName: string, itemName: string) {
    let addNewItemButton = this.page.getByTestId(`${listName}-add-new-item`);
    await addNewItemButton.click();

    let newItemInput = await this.getListItemInputLocator(listName, "");

    await newItemInput.fill(itemName);
    await newItemInput.press("Enter");
  }

  async addNewList(newListName: string) {
    this.page.getByTestId("new_list_name").fill(newListName);
    let addNewListButton = this.page.getByTestId("create_new_list");
    const addListPromise = this.page.waitForResponse(response => response.url().includes("/lists") && response.request().method() === "POST");
    await addNewListButton.click();
    await addListPromise;
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
    listName: string,
    value: string
  ): Promise<Locator> {
    let itemInputLocator = this.getListItemInputLocatorByValue(listName, value);
    let inputDataName = await itemInputLocator.getAttribute("data-name");
    return this.page
      .locator(`input[type="text"][data-name="${inputDataName}"]`)
      .first();
  }

  async getCheckboxItemLocatorByInputLocator(
    inputLocator: Locator
  ): Promise<Locator> {
    let inputDataName = await inputLocator.getAttribute("data-name");
    return this.page
      .locator(`input[type="checkbox"][data-name="${inputDataName}"]`)
      .first();
  }

  async getRemoveButtonLocatorByInputLocator(
    inputLocator: Locator
  ): Promise<Locator> {
    let inputDataName = await inputLocator.getAttribute("data-name");
    return this.page.locator(`button[data-name="${inputDataName}"]`).first();
  }

  async selectUser(user: string) {
    await this.page.selectOption('[aria-label="user_select"]', user);
  }

  async getListNames(): Promise<string[]> {
    let listLocators = await this.page.getByRole("table").all();
    let listNames = await Promise.all(
      listLocators.map(async (e) => {
        return (await e.getAttribute("data-testlist-name")) as string;
      })
    );

    return listNames;
  }

  async checkListCheckbox(listName: string, listItemValue: string) {
    let itemInput = await this.getListItemInputLocator(listName, listItemValue);
    let newItemCheckbox = await this.getCheckboxItemLocatorByInputLocator(
      itemInput
    );
    await newItemCheckbox.click();
  }

  async removeListItem(listName: string, listItemValue: string) {
    let itemInput = await this.getListItemInputLocator(listName, listItemValue);
    let newItemRemoveButton = await this.getRemoveButtonLocatorByInputLocator(
      itemInput
    );
    await newItemRemoveButton.click();
  }
}
