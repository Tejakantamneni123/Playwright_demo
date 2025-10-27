// browser --> context --> pages
// browser - chrome, firefox, webkit
// contexts - we can have multiple contexts for multiple users/apps for the same browser 
// page - newtab, window, popup
import {test,expect, Page, chromium} from "@playwright/test"
test("browser context", async()=>{
const browser=await chromium.launch(); // create browser
const context=await browser.newContext(); // create contex
// create 2 pages
const page1=await context.newPage();
const page2=await context.newPage();
console.log("no of pages:", context.pages().length); //2
await page1.goto("https://testautomationpractice.blogspot.com/");
await expect(page1).toHaveTitle("Automation Testing Practice");
await page2.goto("https://www.selenium.dev/");
await expect(page2).toHaveTitle("Selenium");
await page1.waitForTimeout(3000);
await page2.waitForTimeout(3000);

})