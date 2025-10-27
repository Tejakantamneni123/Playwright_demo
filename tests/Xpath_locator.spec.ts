// Xpath - stands for xml path language, it works on DOM structure
// 2 types of xpath: 
// 1) absolute xpath - starts from the root element, and this is not preferable, use '/' symbol 
//    syntax- /html/body/header/div/div[2]/input
// 2) relative xpath- can directly jump to the element, use "//" symbol, find the element using a shortcut path
//    syntax- //*[@name="search"]
import {test,expect,Locator} from "@playwright/test"
test("Verify Xpath locator", async({page})=>{
await page.goto("https://demowebshop.tricentis.com/");
const logo:Locator=await page.locator("//img[@alt='Tricentis Demo Web Shop']"); //relative xpath
await expect(logo).toBeVisible();
// xpath with contains() function:
const products:Locator=await page.locator("//h2/a[contains(@href, 'computer')]"); //group of elements
const productscount:number=await products.count();  
console.log("count the products:",productscount);  //count-4
expect(productscount).toBeGreaterThan(1);
// textcontent() - get the single webelement in a page
console.log("first product:", await products.first().textContent()); //first element
console.log("last product:", await products.last().textContent());  //last element
console.log("second product:", await products.nth(2).textContent());  //index starts from 0
// allTextcontents()- group of all webelements in a page
let producttitles:string[]= await products.allTextContents(); // get all products
// console.log(producttitles);
for (let pt of producttitles)
{
    console.log(pt);
}
// xpath with starts-with() function:
const buildproducts:Locator=await page.locator("//h2/a[starts-with(@href, '/build')]"); //multiple elements
const count:number=await buildproducts.count();  
console.log("count the products:", count);  
// xpath with text() function:
const reglink:Locator=await page.locator("//a[text()='Register']"); 
await expect(reglink).toBeVisible();
await reglink.click();
// xpath with last() function:
const lastitem:Locator=await page.locator("//div[@class='column follow-us']//li[last()]");
//const last:Locator=await page.locator("//div[@class='column follow-us']//li[2]"); using index
await expect(lastitem).toBeVisible();
console.log("text content of last item:", lastitem.textContent());
// xpath with postion() function:
const postionitem:Locator=page.locator("//div[@class='column follow-us']//li[postion()=3]");
await expect(postionitem).toBeVisible();
console.log("text content of postion:", postionitem.textContent());

})
