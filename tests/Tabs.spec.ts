import {test,expect, Page, chromium} from "@playwright/test"
test("handle tabs", async()=>{
const browser=await chromium.launch(); // create browser
const context=await browser.newContext(); // create contex
// create 2 pages
const parentpage=await context.newPage();
await parentpage.goto("https://testautomationpractice.blogspot.com/");
// context.waitForEvent('page'); //pending, fulfilled, rejected
// parentpage.locator("button[onclick='myFunction()']").click(); // opens new tab
const [childpage]=await Promise.all([context.waitForEvent('page'),parentpage.locator("button[onclick='myFunction()']").click()])
// approach-1: switch b/w pages and title using context
const pages=context.pages(); // returns array
console.log("no of pages:", pages.length);
console.log("title of 1st page:", await pages[0].title());
console.log("title of 2nd page:", await pages[1].title());
// approach-2:
console.log("title of parent page:", await parentpage.title());
console.log("title of child page: ", await childpage.title())

})