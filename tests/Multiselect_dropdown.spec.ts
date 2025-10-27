import {test,expect,Locator} from "@playwright/test"
test("multiselect dropdowns", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// select option from dropdown (4 ways)
await page.locator('#colors').selectOption(['Red', 'Blue', 'Yellow']); // using visibletext
await page.locator('#colors').selectOption(['red', 'blue', 'yellow']); // using value attribute
await page.locator('#colors').selectOption([{label:'Red'}, {label:'Green'}]); // using label
await page.locator('#colors').selectOption([{index:2}, {index:3}]); // using index
// count no of options in dropdown
const countdropdowns:Locator=await page.locator('#colors>option');
await expect(countdropdowns).toHaveCount(7);
// check option is present in dropdown list
const optionstext:string[]=await countdropdowns.allTextContents();
console.log(optionstext);
expect(optionstext).toContain('Green')
// print all options from dropdown
for (const option of optionstext)
{
    console.log(option);
}
})


