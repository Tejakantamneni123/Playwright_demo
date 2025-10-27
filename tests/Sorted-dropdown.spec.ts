import {test,expect,Locator} from "@playwright/test"

// sorted dropdowns
test("sorted dropdowns", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const dropdownoptions:Locator=await page.locator('#colors>option');
const optiontext:string[]= await dropdownoptions.allTextContents();
const originallist:string[]=[... optiontext];
const sortedlist:string[]=[... optiontext].sort();
console.log(originallist);
console.log(sortedlist);
expect(originallist).toEqual(sortedlist);
})


// duplicate elements
test("duplicate elements", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
//const dropdownoptions:Locator=await page.locator('#animals>option'); // not having duplicates
const dropdownoptions:Locator=await page.locator('#colors>option'); // having duplicates
const options:string[]=await dropdownoptions.allTextContents();
const myset=new Set<string>(); // duplicated not allowed
const duplicates:string[]=[];  // duplicates allowed
for(const text of options)
{
  if(myset.has(text))
  {
    duplicates.push(text);
  }
  else
  {
     myset.add(text);
  }
}
console.log("duplicate elements:", duplicates)
expect(duplicates.length).toBe(0);
})