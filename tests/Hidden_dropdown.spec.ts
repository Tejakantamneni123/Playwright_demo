import {test,expect,Locator} from "@playwright/test"
test("hidden dropdown", async({page})=>{
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
// login steps
await page.locator("input[name='username']").fill("Admin");
await page.locator("input[name='password']").fill("admin123");
await page.locator("button[type='submit']").click();
// click on PIM tab
await page.getByText("PIM").click();
// click on job-title dropdown
await page.locator("form i").nth(2).click();
await page.waitForTimeout(3000);
// capture all the options from dropdown and count
const options:Locator=await page.locator("div[role='listbox'] span");
const count:number=await options.count();
console.log("no of options in dropdown:", count)
// print all the options from the dropdown
console.log("all text contents:", await options.allTextContents()); // print text from all elements
console.log("print all options....");
for(let i=0;i<count;i++)
{
    console.log(await options.nth(i).innerText()); // print text from all elements

} 
// select/click on particular option
for(let i=0;i<count;i++)
{
    const text=await options.nth(i).innerText();
    if(text=="Account Assistant")
    {
        await options.nth(i).click()
        break;
    }

} 


})