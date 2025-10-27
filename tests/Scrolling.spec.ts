import {test,expect} from "@playwright/test"
test("scrolling to footer", async({page})=>{
await page.goto("https://demowebshop.tricentis.com/");
// automatically scrolled before any action
const footertext:string=await page.locator(".footer-disclaimer").innerText();
console.log("footer element:", footertext)
})
test("scrolling inside dropdown", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.locator("#comboBox").click();
const option=page.locator("#dropdown div:nth-child(100)");
console.log("print the dropdown:",await option.innerText());
await option.click();
})
test("scrolling inside table", async({page})=>{
await page.goto("https://datatables.net/examples/basic_init/scroll_xy.html");
const name=await page.locator("tbody tr:nth-child(10) td:nth-child(2) ").innerText(); // Automatic vertical scroll
console.log("last name from 10th row and 2nd column: ", name); // kelly
const email=await page.locator("tbody tr:nth-child(10) td:nth-child(9) ").innerText(); // Automatic horizontal scroll
console.log("last name from 10th row and 9th column: ", email); // c.kelly@datatables.net
})