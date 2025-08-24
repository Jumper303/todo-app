import test, { expect } from "@playwright/test";
import { listPage } from "./pageObjects/listPage";

let testListPage: listPage;

test.beforeEach(async ({ page }) => {
    testListPage = new listPage(page);
    await testListPage.gotoPage();
});

test.afterEach(async ({ page }) => {
  // TODO: cleanup
});

test("List item management user flow", async ({ page }) => {
    // TODO: split test into multiple tests by user actions
    const todoListName: string = `newList-${Date.now()}`;
    const firstNewItemValue: string = `new item1-${Date.now()}`;
    const secondNewItemValue: string = `new item2-${Date.now()}`;

    await testListPage.selectUser("Bob");
    let originalListNames: string[] = await testListPage.getListNames();
    
    await testListPage.addNewList(todoListName);
    let newListNames: string[] = await testListPage.getListNames();

    let expectedListName: string[] = originalListNames.concat([todoListName]);
    expect(expectedListName).toEqual(newListNames);
    await testListPage.addNewItemToList(todoListName, firstNewItemValue);

    let originalTodoListItems = await testListPage.getListItemValues(todoListName);
    let originalTodoListCheckboxesStates = await testListPage.getCheckboxStates(todoListName);

    await testListPage.addNewItemToList(todoListName, secondNewItemValue);

    await testListPage.selectUser("John");
    await testListPage.selectUser("Bob");

    let newTodoListItems = await testListPage.getListItemValues(todoListName);
    let expectedTodoListItems = originalTodoListItems.concat([secondNewItemValue]);
    expect(expectedTodoListItems).toEqual(newTodoListItems);

    await testListPage.checkListCheckbox(todoListName, secondNewItemValue);
    await page.reload();

    await testListPage.selectUser("Bob");

    let newTodoListCheckboxesStates = await testListPage.getCheckboxStates(todoListName);
    let expectedTodoListCheckboxesStates = originalTodoListCheckboxesStates;

    expectedTodoListCheckboxesStates.push(true);
    expect(expectedTodoListCheckboxesStates).toEqual(newTodoListCheckboxesStates);

    // --
    await testListPage.removeListItem(todoListName, secondNewItemValue);
    await page.reload();

    await testListPage.selectUser("Bob");

    let todoListItemsAfterRemove = await testListPage.getListItemValues(todoListName);
    expect(originalTodoListItems).toEqual(todoListItemsAfterRemove);
});

// get current lists items,
// add new item to existing list,
// reload page,
// get current lists items,
// compare lists,

// complete an item,
// reload page,
// verify all lists,
// remove item,
// verify all lists,
// switch user,
// verify all lists

// create list,
// delete list
