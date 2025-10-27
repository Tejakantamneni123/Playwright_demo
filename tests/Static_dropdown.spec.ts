import {test,expect,Locator} from "@playwright/test"
test("Static dropdowns", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// select option from dropdown (4 ways)
await page.locator('#country').selectOption('India'); //using visible text
await page.locator('#country').selectOption({value:'uk'}); // using value atrribute
await page.locator('#country').selectOption({label:'Canada'}); // using label 
await page.locator('#country').selectOption({index:4}); // using index
// count no of options in dropdown
const countdropdowns:Locator=await page.locator('#country>option');
await expect(countdropdowns).toHaveCount(10);
// check option is present in dropdown list
const optionstext:string[]=(await countdropdowns.allTextContents()).map(text=>text.trim());
console.log(optionstext);
expect(optionstext).toContain('Japan')
await page.waitForTimeout(3000);
})
