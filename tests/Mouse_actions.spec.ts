import {test,expect} from "@playwright/test"
test("mouse hover", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const pointme=await page.locator(".dropbtn");
await pointme.hover();
const laptops=await page.locator(".dropdown-content a:nth-child(1)");
await laptops.hover();
await page.waitForTimeout(3000);
})

test("Right click", async({page})=>{
await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
const button =await page.locator("span.context-menu-one");
await button.click({button:'right'});
})

test("Double click", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const btncopy=page.locator("button[ondblclick='myFunction1()']");
await btncopy.dblclick(); 
const field2= page.locator("#field2");
expect(field2).toHaveValue("Hello World!");
await page.waitForTimeout(5000);
})

test("Drag and drop", async({page})=>{
await page.goto("https://testautomationcentral.com/demo/drag_and_drop.html");
const source=page.locator("#draggable");
const dest=page.locator("#droppable");
// approach-1: mouse hover and drag manually
await source.hover();
await page.mouse.down();
await dest.hover();
await page.mouse.up();
await page.waitForTimeout(4000);
// Approach-2: drag automatically
await source.dragTo(dest);
})