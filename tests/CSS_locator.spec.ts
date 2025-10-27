// css- cascading style sheets, it follow only top to bottom approach in the webpage
// 2 types of css locators: 
// 1) absolute - starts from the root element,  use '>' symbol and this is not preferable 
// 2) relative - can directly jump to the element, find the element using a shortcut path
// diff ways to create css locator:
// tag with id - tag#id (or) #id
// tag with class - tag.class (or) .class
// tag with any other attribute - tag[attribute=value] (or) [attribute=value]
// tag with class and attribute - tag.class[attribute=value] (or) .class[attribute=value]
// In all the above combinations tag is optional 
// syntax- page.locator(css/xpath)
import {test,expect,Locator} from "@playwright/test"
test("Verify CSS locators", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
     // tag#id - tag is optional
    /*await expect(page.locator("input#small-searchterms")).toBeVisible();
    await page.locator("input#small-searchterms").fill("t-shirts");
    */
    // tag.class - tag is optional
    /*await expect(page.locator("input.search-box-text")).toBeVisible();
    await page.locator("input.search-box-text").fill("t-shirts");
    */
    // tag[attribute=value]
    /*await expect(page.locator("input[name=q]")).toBeVisible();
     await page.locator("input[name=q]").fill("t-shirts");
    */
    // tag.class[attribute=value]
     await expect(page.locator("input.search-box-text[value='Search store']")).toBeVisible();
     await page.locator("input.search-box-text[value='Search store']").fill("t-shirts");
     await page.waitForTimeout(4000);
    
})