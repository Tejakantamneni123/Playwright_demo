
import {test, expect} from "@playwright/test"

// fixture - global variable : page, browser

test("verify page title", async({page})=>{
await page.goto("https://qtopportalweb.aaps.deloitte.com");
//let Title:string=await page.title();
console.log("Title:", await page.title());
await expect(page).toHaveTitle("Deloitte | Legal Entities and Form AP Hours")
})
