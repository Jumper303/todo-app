import test, { expect } from "@playwright/test";

test('List item management user flow', async ({page})=> {
    await page.goto('/');
    let todoListName:string = 'secondList';
    let secondListId:string = await page.locator(`table[data-testlist-name="${todoListName}"]`).getAttribute('data-testid') as string;
    let originalTodoListItems = await Promise.all((await page.getByTestId(`${todoListName}-item-name`).all()).map(e => e.getAttribute('value')));
    let addNewItemButton = await page.getByTestId(`${todoListName}-add-new-item`).getByText('+');  
    let addNewItemButtonDataName = await addNewItemButton.getAttribute('data-name');
    await addNewItemButton.click();

    let newItemInput = page.locator(`input[value=""][data-testid="${todoListName}-item-name"]`).first();
    let newItemInputDataName = await newItemInput.getAttribute('data-name');
    await newItemInput.fill('new item2');
    await page.reload();
    let newTodoListItems = await Promise.all((await page.getByTestId(`${todoListName}-item-name`).all()).map(e => e.getAttribute('value')));
    expect(originalTodoListItems.concat(['new item2'])).toEqual(newTodoListItems);
    console.log(secondListId);
    
    let originalTodoListCheckboxesStates = await Promise.all((await page.locator(`input[type="checkbox"][id="${secondListId}"]`).all()).map(e => e.isChecked()));

    let newItemCheckbox = page.locator(`input[type="checkbox"][data-name="${newItemInputDataName}"]`);
    await newItemCheckbox.click();
    await page.reload();
    let newTodoListCheckboxesStates = await Promise.all((await page.locator(`input[type="checkbox"][id="${secondListId}"]`).all()).map(e => e.isChecked()));
    console.log(originalTodoListCheckboxesStates);
    console.log(newTodoListCheckboxesStates);
    originalTodoListCheckboxesStates.pop();
    originalTodoListCheckboxesStates.push(true);
    expect(originalTodoListCheckboxesStates).toEqual(newTodoListCheckboxesStates);

    let newItemRemoveButton = page.locator(`button[data-name="${newItemInputDataName}"]`);
    await newItemRemoveButton.click();
    let todoListItemsAfterRemove = await Promise.all((await page.getByTestId(`${todoListName}-item-name`).all()).map(e => e.getAttribute('value')));
    await page.reload();
    expect(originalTodoListItems).toEqual(todoListItemsAfterRemove);

});

// get current lists items, 
// add new item to existing list, 
// reload page, 
// get current lists itmes, 
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