// By default, dialogs are auto-dismissed by playwright
// alert(), confirm(), prompt()
import {test,expect,Locator} from "@playwright/test"
test("Verify simple alert ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// Register a dialog handler
page.on("dialog", (dialog) => {
console.log("Dialog type is:", dialog.type());
expect(dialog.type()).toContain("alert")
console.log("Dialog text is:", dialog.message());
expect(dialog.message()).toContain('I am an alert box!')
dialog.accept();
})
await page.locator("#alertBtn").click(); // opens dialog
await page.waitForTimeout(4000);
})
test("Verify confirmation alert ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// Register a dialog handler
page.on("dialog", (dialog) => {
console.log("Dialog type is:", dialog.type());
expect(dialog.type()).toContain("confirm")
console.log("Dialog text is:", dialog.message());
expect(dialog.message()).toContain('Press a button!')
dialog.dismiss();
})
await page.locator('#confirmBtn').click(); // opens confirmation dialog
const text =await page.locator('#demo').innerText();
console.log("o/p text is:", text);
await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
await page.waitForTimeout(4000);
})
test.only("Verify prompt alert ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// Register a dialog handler
page.on("dialog", (dialog) => {
console.log("Dialog type is:", dialog.type());
expect(dialog.type()).toContain("prompt")
console.log("Dialog text is:", dialog.message());
expect(dialog.message()).toContain('Please enter your name:')
expect(dialog.defaultValue()).toContain("Harry Potter"); // checks default value of dialog
dialog.accept('John');
})
await page.locator('#promptBtn').click(); // opens confirmation dialog
const text =await page.locator('#demo').innerText();
console.log("o/p text is:", text);
await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?');
await page.waitForTimeout(4000);
})
