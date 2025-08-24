import test, { expect } from "@playwright/test";
import { listPage } from "./pageObjects/listPage";

let testListPage: listPage;

test.beforeEach(async ({ page }) => {
  testListPage = new listPage(page);
  await testListPage.gotoPage();
});

test.afterAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  testListPage = new listPage(page);
  // TODO: use API calls for setup and teardown 
  await testListPage.gotoPage();
  await testListPage.selectUser("Bob");
  await testListPage.removeAllTestLists();
  await testListPage.selectUser("John");
  await testListPage.removeAllTestLists();
  await testListPage.selectUser("Sam");
  await testListPage.removeAllTestLists();
});

test("should allow me to create a list", async ({ page }) => {
  await testListPage.selectUser("Bob");
  let originalListNames: string[] = await testListPage.getListNames();
  const todoListName: string = `newList-${Date.now()}-${Math.random()}`;
  await testListPage.addNewList(todoListName);
  let newListNames: string[] = await testListPage.getListNames();
  expect(newListNames).toContain(todoListName);
});

test("should allow me to delete a list", async ({ page }) => {
  await testListPage.selectUser("John");
  const todoListName: string = `newList-${Date.now()}-${Math.random()}`;
  await testListPage.addNewList(todoListName);

  await testListPage.removeList(todoListName);
  let newNewListNames: string[] = await testListPage.getListNames();
  expect(newNewListNames).not.toContain(todoListName);
  expect(newNewListNames).toContain("firstList");
});


test("should allow me to create list items", async ({ page }) => {
  await testListPage.selectUser("Sam");
  const todoListName: string = `newList-${Date.now()}-${Math.random()}`;
  await testListPage.addNewList(todoListName);

  const newItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, newItemName);

  let originalTodoListItems = await testListPage.getListItemValues(todoListName);

  const secondNewItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, secondNewItemName);

  let newTodoListItems = await testListPage.getListItemValues(todoListName);
  let expectedTodoListItems = originalTodoListItems.concat([secondNewItemName]);
  expect(expectedTodoListItems).toEqual(newTodoListItems);
});

test("should allow me to mark list items as completed", async ({ page }) => {
  await testListPage.selectUser("Sam");
  const todoListName: string = `newList-${Date.now()}-${Math.random()}`;
  await testListPage.addNewList(todoListName);

  const newItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, newItemName);

  const secondNewItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, secondNewItemName);

  let originalTodoListCheckboxesStates = await testListPage.getCheckboxStates(todoListName);
  await testListPage.checkListCheckbox(todoListName, secondNewItemName);

  let newTodoListCheckboxesStates = await testListPage.getCheckboxStates(todoListName);
  let expectedTodoListCheckboxesStates = [false, true];
  expect(expectedTodoListCheckboxesStates).toEqual(newTodoListCheckboxesStates);
});

test("should allow me to remove list items", async ({ page }) => {
  await testListPage.selectUser("John");
  const todoListName: string = `newList-${Date.now()}-${Math.random()}`;
  await testListPage.addNewList(todoListName);

  const newItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, newItemName);

  const secondNewItemName: string = `newItem-${Date.now()}-${Math.random()}`;
  await testListPage.addNewItemToList(todoListName, secondNewItemName);

  await testListPage.removeListItem(todoListName, secondNewItemName);

  let listItems = await testListPage.getListItemValues(todoListName);
  expect(listItems).toContain(newItemName);
  expect(listItems).not.toContain(secondNewItemName);
});
