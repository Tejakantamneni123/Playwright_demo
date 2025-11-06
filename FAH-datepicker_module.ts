import {test,expect,Locator, Page} from "@playwright/test"
export async function selectdate(targetyear:string,targetmonth:string,targetdate:string,page:Page,isfuture:boolean)
{   
while(true)
{
const currentmonth= await page.locator(".rc-calendar-my-select > .rc-calendar-month-select").textContent();
const currentyear= await page.locator(".rc-calendar-my-select > .rc-calendar-year-select").textContent();
if(currentmonth==targetmonth && currentyear==targetyear)
{
    break;
}
if(isfuture)
{
    await page.getByTitle('Next month (PageDown)').click(); //future
}
else
{
    await page.getByTitle('Previous month (PageUp)').click();  //past

}
}
const alldates=await page.locator(".rc-calendar-table td").all();
for(let dt of alldates)
{
    const date=await dt.innerText();
    if(date==targetdate)
    {
      await dt.click();
      break;
    }
}
}