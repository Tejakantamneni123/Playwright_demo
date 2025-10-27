import {test,expect,Locator} from "@playwright/test"
test("Verify chrome cpu load in Dynamic table", async({page})=>{
await page.goto("https://practice.expandtesting.com/dynamic-table");
const table:Locator=page.locator("table[class='table table-striped'] tbody");
await expect(table).toBeVisible();
// count no of rows in a table
const rows:Locator[]=await table.locator("tr").all();
console.log("no of rows in table:", rows.length);
expect(rows).toHaveLength(4);
// Read each row for chrome presence
let cpuload ='';
for (const row of rows)
{
 const processname:string= await row.locator("td").nth(0).innerText();
 if(processname=="Chrome")
 {
   //cpuload= await row.locator('td:has-text("%")').innerText(); // css syntax
    cpuload= await row.locator("td",{hasText:"%"}).innerText(); // playwright syntax
    console.log("cpuload of chrome:", cpuload);
    break;
 }
}
// compare it with the yellow label
const yellowtext:string=await page.locator("#chrome-cpu").innerText();
console.log("chrome cpu of yellow box:", yellowtext);
if(yellowtext.includes(cpuload))
{
    console.log("cpu load of chrome is equal")
}
else
{
    console.log("cpu load of chrome is not equal")
}
expect(yellowtext).toContain(cpuload);

})
