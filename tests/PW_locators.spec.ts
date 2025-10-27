//locator- identifies the element on the webpage
//DOM- Document object model, it is an api interface provided by browser

// page.getByText()- to locate by text content and works for sub-strings,regular expressions as well
                      // non-interactive elements like-div,span,p,etc.
// page.getByAltText()- to locate an element, usually image, based on alt attribute
// page.getByRole()- to locate by explicit and implicit accesibility attributes
                //interactive elements like buttons,links,checkboxes,lists,tables,headings 
// page.getByLabel()- to locate a form control by associated label's text
// page.getByPlaceholder()- to locate an input by placeholder
// page.getByTitle()- to locate an element by its title attribute
// page.getByTestId()- to locate an element based on its data-testid attribute

import {test,expect,Locator} from "@playwright/test"
test("Verify playwright locators", async({page})=>{
await page.goto("https://demo.nopcommerce.com");
const logo:Locator=page.getByAltText("nopCommerce demo store"); //getByAltText()
await expect(logo).toBeVisible();
await expect(page.getByText("Welcome to our store")).toBeVisible(); //getByText() using full/partial string
//await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible(); //getByText using reg expression
await page.getByRole("link",{name:"Register"}).click();
await expect(page.getByRole("heading",{name:"Register"})).toBeVisible(); //can also use getByText();
await page.getByLabel("First name:").fill("Raviteja"); //getByLabel()
await page.getByLabel("Last name:").fill("Raviteja"); //getByLabel()
await page.getByLabel("Email:").fill("ravikantamneni94@gmail.com"); //getByLabel()-tag
await page.getByPlaceholder('Search store').fill("Apple");  //getByPlaceholder()-attribute
})
