import {test,expect,Locator} from "@playwright/test"
test("Read data from all the pages", async({page})=>{
await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
let hasallpages=true;
while(hasallpages)
{
    const rows=await page.locator("#example tbody tr").all();
     for(let row of rows)
     {
        console.log(await row.innerText());
     }
     // button[aria-label='Next']
     // button[aria-controls='example']:has-text(">")
     // button[aria-controls='example']:nth-child(9)
 const nextbutton:Locator= page.locator("button[aria-label='Next']");
 const isdisabled= await nextbutton.getAttribute('class');
if(isdisabled?.includes('disabled'))
{
  hasallpages=false;
}else
{
   await nextbutton.click();
}}
})
test("Filter the rows and check the count", async({page})=>{
await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
const dropdowns:Locator= page.locator("#dt-length-0");
await dropdowns.selectOption({value:'25'});
// approach-1
const filterrow=await page.locator("#example tbody tr").all(); 
expect(filterrow.length).toBe(25); // assertion
// approach-2
const filterrow2=await page.locator("#example tbody tr"); 
expect(filterrow2).toHaveCount(25); // assertion
})
test.only("Search for specific data in a table", async({page})=>{
await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
const searchboxtext:Locator= page.locator("#dt-search-0");
await searchboxtext.fill("Paul Byrd");
await page.waitForTimeout(3000);
const searchedrow=await page.locator("#example tbody tr").all(); 
if(searchedrow.length>=1)
{
  let matchfound=false;
  for(let row of searchedrow)
  {
    const text=await row.innerText();
    if(text.includes('Paul Byrd'))
    {
        console.log("record found");
        matchfound=true;
        break;
    }
  }
  expect(matchfound).toBe(true);
}
else
{
    console.log("record not found");
}
})