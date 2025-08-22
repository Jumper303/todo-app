import test, { expect } from "@playwright/test";
import { listPage } from "./pageObjects/listPage";

let testListPage: listPage;

test.beforeEach(async ({ page }) => {
    testListPage = new listPage(page);
    await testListPage.gotoPage();
});

test("List item management user flow", async ({ page }) => {
    // TODO: split test into multiple tests by user actions
    const todoListName: string = "secondList";
    const newItemValue: string = "new item2";

    await testListPage.selectUser("Bob");

    let originalTodoListItems = await testListPage.getListItemValues(
        todoListName
    );
    let originalTodoListCheckboxesStates = await testListPage.getCheckboxStates(
        todoListName
    );

    await testListPage.addNewItemToList(todoListName);

    let newItemInput = await testListPage.getListItemInputLocator(
        todoListName,
        ""
    );

    await newItemInput.fill(newItemValue);
    await newItemInput.press("Enter");
    await page.reload();

    await testListPage.selectUser("Bob");

    let newTodoListItems = await testListPage.getListItemValues(todoListName);
    let expectedTodoListItems = originalTodoListItems.concat([newItemValue]);
    expect(expectedTodoListItems).toEqual(newTodoListItems);
    // --
    let newItemCheckbox = await testListPage.getCheckboxItemLocatorByInputLocator(
        newItemInput
    );
    await newItemCheckbox.click();
    await page.reload();

    await testListPage.selectUser("Bob");

    let newTodoListCheckboxesStates = await testListPage.getCheckboxStates(
        todoListName
    );
    let expectedTodoListCheckboxesStates = originalTodoListCheckboxesStates;

    expectedTodoListCheckboxesStates.push(true);
    expect(expectedTodoListCheckboxesStates).toEqual(newTodoListCheckboxesStates);
    // --
    let newItemRemoveButton =
        await testListPage.getRemoveButtonLocatorByInputLocator(newItemInput);
    await newItemRemoveButton.click();
    await page.reload();

    await testListPage.selectUser("Bob");

    let todoListItemsAfterRemove = await testListPage.getListItemValues(
        todoListName
    );
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
