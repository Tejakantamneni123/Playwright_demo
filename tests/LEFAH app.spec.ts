import {test,expect, chromium} from "@playwright/test"
test("LEFAH login page", async()=>{
const browser=await chromium.launch({headless:false}); //we can see UI screen
const context=await browser.newContext({viewport:{width:1278, height:574}}); 
const page = await context.newPage();
await page.goto("https://qtopportalweb.aaps.deloitte.com/");
// click on get started link
await page.getByRole("button",{name:"get started "}).click();
// filling login details
await page.locator("input[type='email']").fill("LEFAHTest1014@deloitte.com"); // email field
await page.locator("input[type='submit']").click(); // next button 
await page.locator("input[name='passwd']").fill("NH@mA4g3$pn?qZF!"); // password field
await page.locator("input[type='submit']").click(); // sign-in button

})