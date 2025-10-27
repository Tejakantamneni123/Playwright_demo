import {test,expect} from "@playwright/test"
test("infinite scroll", async({page})=>{
await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
// window.scrollTo(0,document.body.scrollHeight);
let previousheight=0;
while(true)
{
    // scroll down the page
     await page.evaluate(() =>{
     window.scrollTo(0,document.body.scrollHeight);
     })
    // wait for content to load
     await page.waitForTimeout(4000);
     // capture current height of the page
     const currentheight=await page.evaluate(()=>{
     return document.body.scrollHeight;
     })
    console.log("current height is:", currentheight);
    console.log("previous height is:", previousheight);
     if(currentheight===previousheight)
     {
        break;
     }
    previousheight=currentheight;
}
 console.log("Reached end of the page..");
})