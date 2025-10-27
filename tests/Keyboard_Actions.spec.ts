import {test,expect} from "@playwright/test"
test("keyboard actions", async({page})=>{
// keyboard methods: inserttext, press, down, up, type
await page.goto("https://testautomationpractice.blogspot.com/");
const input1=page.locator("#input1");
// focus on input1
await input1.focus(); // input1.click();
// provide the text input1
await page.keyboard.insertText("welcome");
// ctrl + A - select the text from input1
await page.keyboard.press('Control+A');
// ctrl + C - copy the text from input1
await page.keyboard.press('Control+C');
// Press tab-2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
// ctrl + V - paste the text in input2
await page.keyboard.press('Control+V');
// Press tab-2 times
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
// ctrl + V - paste the text in input3
await page.keyboard.press('Control+V');
await page.waitForTimeout(4000);
})