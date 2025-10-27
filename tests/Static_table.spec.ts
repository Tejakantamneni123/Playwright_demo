import {test,expect,Locator} from "@playwright/test"
test("Static table", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const table:Locator=page.locator("table[name='BookTable'] tbody");
await expect(table).toBeVisible();
// count no of rows in a table including header
const rows:Locator= table.locator("tr");
await expect(rows).toHaveCount(7); //7
const rowscount:number=await rows.count();
console.log("no of rows in table:",rowscount);
expect(rowscount).toBe(7);
// count no of columns in a table including header
const columns:Locator= rows.locator("th");
await expect(columns).toHaveCount(4); //4
const columnscount:number=await columns.count();
console.log("no of columns in table:",columnscount);
expect(columnscount).toBe(4);
// Read all the data from specific row
const secondrowcell:Locator= rows.nth(2).locator("td");
const seconddrowtext:string[]=await secondrowcell.allInnerTexts();
console.log("print all texts from second row:", seconddrowtext);
await expect(secondrowcell).toHaveText(['Learn Java', 'Mukesh', 'Java', '500' ])
// Read all the data from a table excluding header
console.log("print all the data from table");
const allrowdata=await rows.all(); 
for(let row of allrowdata.slice(1)) // slice will skip header row
{
   const data=await row.locator("td").allInnerTexts();
   console.log(data);
}
// print book names where author name is mukesh
console.log("books written by mukesh..")
for(let row of allrowdata.slice(1)) // slice will skip header row
{
   const cells=await row.locator("td").allInnerTexts();
   const author=cells[1];
   const book=cells[0];
   if (author==="Mukesh")
   {
      console.log(`${author} ${book}`);
   }
}
// calculate total price of all books
let totalprice:number=0;
for(let row of allrowdata.slice(1)) // slice will skip header row
{
   const cells=await row.locator("td").allInnerTexts();
   const price=cells[3];
   totalprice=totalprice+parseInt(price);
}
console.log("total price is:", totalprice)
})
