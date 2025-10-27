import {test,expect,Locator, Page} from "@playwright/test"
async function selectdate(targetyear:string,targetmonth:string,targetdate:string,page:Page,isfuture:boolean)
{   
while(true)
{
const currentmonth= await page.locator(".ui-datepicker-month").textContent();
const currentyear= await page.locator(".ui-datepicker-year").textContent();
if(currentmonth==targetmonth && currentyear==targetyear)
{
    break;
}
if(isfuture)
{
    await page.locator(".ui-datepicker-next").click(); //future
}
else
{
    await page.locator(".ui-datepicker-prev").click(); //past
}
}
const alldates=await page.locator(".ui-datepicker-calendar td").all();
for(let dt of alldates)
{
    const datetext=await dt.innerText();
    if(datetext==targetdate)
    {
        await dt.click();
        break;
    }
}
}

test("Verify datepicker for jquery", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const datepicker:Locator=page.locator("#datepicker");
await expect(datepicker).toBeVisible();
// Approach-1: using fill()- if we have input tag
// datepicker.fill("10/10/2025"); // mm/dd/yyyy
// Approach-2: using date picker 
await datepicker.click(); // to open calendar
// select target date
const year='2024';
const month='May';
const date='24';
selectdate(year,month,date,page,false);
const expecteddate= '05/24/2024'; // mm/dd/yyyy
await expect(datepicker).toHaveValue(expecteddate);
await page.waitForTimeout(3000);
})
