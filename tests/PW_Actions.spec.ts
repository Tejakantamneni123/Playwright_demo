import {test,expect,Locator} from "@playwright/test"
// Input text boxes
test("Input actions", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const textbox:Locator=page.locator('#name');
await expect(textbox).toBeVisible();
await expect(textbox).toBeEnabled();
const maxlength:any=await textbox.getAttribute('maxlength'); // returns value of max length attribute
expect(maxlength).toBe('15');
await textbox.fill("kantamneni");
const enteredvalue:string=await textbox.inputValue(); 
console.log("first name:", enteredvalue); // returns input value of textbox
expect(enteredvalue).toBe("kantamneni")
await page.waitForTimeout(3000);
})
// Radio buttons
test("Radio buttons", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const male_radio:Locator=page.locator('#male'); // Male radiobutton
await expect(male_radio).toBeEnabled();
await male_radio.check(); // select radio button
expect(await male_radio.isChecked()).toBe(true);
await expect(male_radio).toBeChecked();
})
// check boxes
test.only("check boxes", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// To select specific checkbox:
const sundaycheckbox:Locator=page.getByLabel('Sunday');
await sundaycheckbox.check();
await expect(sundaycheckbox).toBeChecked();
// To select all checkboxes:
const days:string[]=['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday'];
const checkboxs:Locator[]=days.map(index => page.getByLabel(index)); // Map index
for (const checkbox of checkboxs)
{
    await checkbox.check();
    await expect(checkbox).toBeChecked();
}
// Un-select last 3 checkboxes:
for (const checkbox of checkboxs.slice(-3))
{
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
}
// If checked, uncheck; If unchecked, check - Assert state flipped
for (const checkbox of checkboxs)
{
    if(await checkbox.isChecked()) // true
    {
       // only if checked
       await checkbox.uncheck();
       await expect(checkbox).not.toBeChecked();
    }
    else
    {   
        // only if unchecked
       await checkbox.check();
       await expect(checkbox).toBeChecked();
    }
}
// randonly selected checkboxes- index[1,3,6]
const indexes:number[]=[1,3,6];
for (const i of indexes)
{
    await checkboxs[i].check();
    await expect(checkboxs[i]).toBeChecked();
}
})
