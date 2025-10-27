import {test,expect,Locator} from "@playwright/test"
//xpath
test("Verify dynamic elements using xpath ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// loop to click the button on 5 times
for(let i=1;i<=5;i++){
let button:Locator=await page.locator("//button[text()='START' or text()='STOP']");
// click the button
await button.click();
// wait for 2 seconds
await page.waitForTimeout(2000);
}
});
// css selector 
test("Verify dynamic elements using css ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// loop to click the button on 5 times
for(let i=1;i<=5;i++){
let button:Locator=await page.locator("button[name='START'], button[name='STOP']");
// click the button
await button.click();
}
})
// PW Locators
test("Verify dynamic elements using PW locators ", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
// loop to click the button on 5 times
for(let i=1;i<=5;i++){
let button:Locator=await page.getByRole('button',{name:'/START|STOP/'});
// click the button
await button.click();
}
})
