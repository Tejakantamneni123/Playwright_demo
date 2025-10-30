import {test,expect} from "@playwright/test"
test("screenshots demo", async({page})=>{
await page.goto("https://demowebshop.tricentis.com/");
const timestamp=Date.now();
// page screenshot
await page.screenshot({path:'Screenshots/'+'homepage'+timestamp+'.png'})

// full page screenshot
await page.screenshot({path:'Screenshots/'+'homepage'+timestamp+'.png',fullPage:true })

// element screenshot
await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'Screenshots/'+'logo'+timestamp+'.png'})



})