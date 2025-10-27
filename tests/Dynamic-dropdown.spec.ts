import {test,expect,Locator} from "@playwright/test"
test("autosuggest dropdown", async({page})=>{
await page.goto('https://www.flipkart.com/');
await page.locator("input[name='q']").fill("smart"); // search text
await page.waitForTimeout(3000);
// Get all the suggested options and count-->Ctrl+shift+P on DOM page-->emulate focused page 
const options:Locator=await page.locator("ul>li");
const count=await options.count();
console.log("No of suggested options:", count);
// print all the suggested options
console.log("5th option:", await options.nth(5).innerText()); // print text from specific element
console.log("print all the options...")
for(let i=0;i<count;i++)
{
    console.log(await options.nth(i).innerText()); // print text from all elements
    // console.log("all options:", await options.nth(i).textContent());
    // <span>abc<span> - use innertext and textcontent
} 
// select/click on the smartphone option
for (let i=0;i<count;i++)
{
   const text= await options.nth(i).innerText();
   if(text=="smartphone")
   {
    options.nth(i).click();
    break;
   }
}
})
