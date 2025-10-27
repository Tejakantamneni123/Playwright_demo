import {test,expect,Locator} from "@playwright/test"
test("Verify Xpath Axes", async({page})=>{
await page.goto('https://www.w3schools.com/html/html_tables.asp');
// self axes - select <td> element of Germany
const tablecell:Locator=page.locator("//td[text()='Germany']/self::td");
await expect(tablecell).toHaveText('Germany');
// parent axes - parent <tr> element of germany cell
const tablerow:Locator=page.locator("//td[text()='Germany']/parent::tr");
await expect(tablerow).toContainText('Alfreds Futterkiste Maria Anders');
console.log(await tablerow.textContent());
// child axes - get all <td> elements of second <tr> in table
const secondrow:Locator= page.locator("//table[@id='customers']//tr[2]/child::td");
await expect(secondrow).toHaveCount(3);
// ancestor axes- parent/grandparents, get <table> of germany cell
const table:Locator= page.locator("//table[@id='customers']//ancestor::table");
await expect(table).toHaveAttribute('id', 'customers');
// descendant axes - child/grand childern, get all <td> elements in table
const alltds:Locator= page.locator("//table[@id='customers']//descendant::td");
await expect(alltds).toHaveCount(18);
// following axes - siblings/childern 
const followingcell:Locator=page.locator("//td[text()='Germany']/following::td[1]");
await expect(followingcell).toHaveText("Centro comercial Moctezuma")
// following-sibiling - silings
const sibilings:Locator=page.locator("//td[text()='Germany']/following-sibiling::td");
await expect(sibilings).toHaveCount(0);
// preceding - get <td> just before germany
const preceding:Locator=page.locator("//td[text()='Germany']/preceding::td[1]");
await expect(preceding).toHaveText("Maria Anders")
// preceding-sibiling- get <td>s just left of germany
const leftsiblings:Locator=page.locator("//td[text()='Germany']/preceding::td");
await expect(leftsiblings.nth(0)).toHaveText('Alfreds Futterkiste');

})
