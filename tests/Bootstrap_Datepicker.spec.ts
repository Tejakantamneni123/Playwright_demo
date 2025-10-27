import {test,expect,Locator, Page} from "@playwright/test"
test("Verify datepicker for check-in and check-out dates", async({page})=>{
await page.goto("https://www.booking.com/");
// click on date picker field
await page.getByTestId("searchbox-dates-container").click();
// check-in date selection
let checkinyear:string="2026";
let checkinmonth:string="May";
let checkindate:string="20";
// find the desired checkin year and checkin month
while(true)
{
const checkinmonthyear= await page.locator("h3[aria-live='polite']").nth(0).innerText();
const currentmonth= checkinmonthyear.split("")[0];
const currentyear= checkinmonthyear.split("")[1];
if(currentmonth==checkinmonth && currentyear==checkinyear)
{
    break;
}
else
{
    await page.locator("button[aria-label='Next month']").click(); 
}
}
// select the specific check-in date
let alldates=await page.locator("table[class='b8fcb0c66a'] tbody").nth(0).locator("td").all();
let checkindateselected=false;
for(let date of alldates)
{
    const datetext=await date.innerText();
    if(datetext==checkindate)
    {
        await date.click();
        checkindateselected=true;
        break;
    }
}
expect(checkindateselected).toBeTruthy();

// check-out date selection
let checkoutyear:string="2026";
let checkoutmonth:string="May";
let checkoutdate:string="20";
// find the desired checkout year and checkout month
while(true)
{
const checkoutmonthyear= await page.locator("h3[aria-live='polite']").nth(1).innerText();
const currentmonth= checkoutmonthyear.split("")[0];
const currentyear= checkoutmonthyear.split("")[1];
if(currentmonth==checkoutmonth && currentyear==checkoutyear)
{
    break;
}
else
{
    await page.locator("button[aria-label='Next month']").click(); 
}
}
// select the specific check-in date
let alldate=await page.locator("table[class='b8fcb0c66a'] tbody").nth(1).locator("td").all();
let checkoutdateselected=false;
for(let date of alldate)
{
    const datetext=await date.innerText();
    if(datetext==checkoutdate)
    {
        await date.click();
        checkoutdateselected=true;
        break;
    }
}
expect(checkoutdateselected).toBeTruthy();
})