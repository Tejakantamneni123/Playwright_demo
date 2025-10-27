import {test,expect,Page} from "@playwright/test"
test("Authenticated popups", async({browser})=>{
const context=await browser.newContext({httpCredentials:{username:'admin', password:'admin'}}); // create contex
const page=await context.newPage();

// https://the-internet.herokuapp.com/basic_auth"
// https://username:password@the-internet.herokuapp.com/basic_auth"

// approach-1: directly pass un and pass along with url
await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
await page.waitForLoadState(); // wait for page loaded completely
await expect(page.locator("text=Congratulations")).toBeVisible();
await page.waitForTimeout(3000);

// approach-2: pass url along with browser context
await page.goto("https://the-internet.herokuapp.com/basic_auth");
await page.waitForLoadState(); // wait for page loaded completely
await expect(page.locator("text=Congratulations")).toBeVisible();
await page.waitForTimeout(3000);
})