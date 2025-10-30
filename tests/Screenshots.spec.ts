import {test,expect} from "@playwright/test"
test("screenshots demo", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const timestamp=Date.now();
// page screenshot
await page.screenshot({path:'Screenshots/'+'homepage'+timestamp+'.png'})

// full page screenshot
await page.screenshot({path:'Screenshots/'+'homepage'+timestamp+'.png',fullPage:true })

})