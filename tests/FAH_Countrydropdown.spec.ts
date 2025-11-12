import {test,expect,Locator,chromium} from "@playwright/test"
import { Testconfig } from "../pages/LEFAH_test_parameters"
import { LEFAH_Homepage } from "../pages/LEFAH_homepage"
import { selectdate } from "../pages/FAH-datepicker_module"
test('autosuggest dropdown in fah screen', async ({}) => {
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const config = new Testconfig();
  await context.clearCookies({name:'Here’s how we use cookies'}); // Clear cookies
  await page.goto(config.appUrl); // LEFAH application URL
  // Verify LEFAH homepage title
  console.log("Title:", await page.title()); // print page title
  await expect(page).toHaveTitle("Deloitte | Legal Entities and Form AP Hours");
  // Click on get started link on LEFAH homepage
  const homepage = new LEFAH_Homepage(page);  
  await homepage.clickgetstartedlink();
  // Login process
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(config.app_email); // email field
  await page.getByRole('button', { name: 'Next' }).click(); // next button
  await page.getByRole('textbox', { name: 'Enter the password for' }).fill(config.app_password);// password field
  await page.getByRole('button', { name: 'Sign in' }).click(); // sign-in button
  // Navigate to LA dashboard
  await page.waitForTimeout(5000);
  await page.getByAltText("Group Engagement dashboard").click(); // LA dashboard
  await page.getByTestId('alert-custom-close').getByRole('img').click();
  await page.getByText('CREATE NEW FORM AP HOURS RECORD').click(); // create new fah button
  await page.getByLabel('Country of the firm issuing the audit report').isVisible();
  await page.locator('.dropDownWrapper > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click(); // country dropdown
  await page.waitForTimeout(4000);
// Get all the suggested options and count-->Ctrl+shift+P on DOM page-->emulate focused page
 const country: Locator = page.locator("ul[role='listbox'] li:nth-child(13)"); //Aruba option
 await country.click();
 console.log("Selected country is:", await country.textContent());
 
  /*const count = await options.count();
  console.log("No of suggested options:", count);
  // print all the suggested options
  console.log("print all the options...")
  for (let i = 0; i < count; i++)
  {
      console.log(await options.nth(i).allTextContents()); // print text from all elements
  }
// select/click on the particular option
for (let i = 0; i < count; i++)
{
   const text = await options.nth(i).innerText();
   if (text == "Aruba")
   {
    await options.nth(i).click();
    break;
   }
}*/

})