import {test,expect,Locator} from "@playwright/test"
test("Comparing methods", async({page})=>{
await page.goto("https://demowebshop.tricentis.com/");
const products:Locator=page.locator(".product-title"); //6 elements
// 1) innertext() vs textcontent()
//console.log(await products.nth(1).innerText()); // eliminates linebreaks and whitespaces, return only strings
//console.log(await products.nth(1).textContent()); // return null or strings
const count:number=await products.count()
console.log("count is:", count);
for(let i=0;i<count;i++)
{
  //const productname:string=await products.nth(i).innerText();
  //console.log(productname);
  const productname:null|string=await products.nth(i).textContent();
  console.log(productname?.trim());
}
// 2) allinnertexts() vs alltextcontents()
//const productnames:string[]=await products.allInnerTexts();
//console.log(productnames)
const productnames:string[]=await products.allTextContents();
console.log(productnames)
const productnamestrimmed:string[]=await productnames.map(text=> text.trim());
console.log(productnamestrimmed)
// 3) all() - converts locator--> locator[]
const productlocators:Locator[]=await products.all();
console.log(productlocators);
console.log(await productlocators[1].innerText());
for(let prodlocs of productlocators)
{
    console.log(await prodlocs.innerText());
}
})
