import {test,expect, Page} from "@playwright/test"
test("handle popups", async({browser})=>{
const context=await browser.newContext(); // create contex
const page=await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");
// multiple popups
//page.waitForEvent('popup');
//await page.locator("#PopUp").click();
await Promise.all([page.waitForEvent('popup'), await page.locator("#PopUp").click()]);
const allpopups=context.pages(); // retuns an array
console.log("no of pages:", allpopups.length);
console.log(allpopups[1].url())
for(const pw of allpopups)
{
    const title = await pw.title()
    if(title.includes('Playwright'))
    {
        await pw.locator(".getStarted_Sjon").click();
        await pw.close();
    }
}
await page.waitForTimeout(3000);
})