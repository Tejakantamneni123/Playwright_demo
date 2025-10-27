import {test,expect, chromium } from "@playwright/test"
test("browser settings", async()=>{
const browser=await chromium.launch({headless:false}); //we can see UI
const context=await browser.newContext(
    {
        viewport:{width:1280, height:1080}
    }
);
const page = await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");
await page.waitForTimeout(7000);
})
