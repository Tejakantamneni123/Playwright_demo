import {test,expect,Locator,Page} from "@playwright/test"
import { Testconfig } from "../pages/LEFAH_test_parameters"
import { LEFAH_Homepage } from "../pages/LEFAH_homepage"
import { selectdate } from "../pages/FAH-datepicker_module"
test('Create New Form AP Hours', async ({ page }) => {
  const config = new Testconfig();
  await page.goto(config.appUrl);
  // Verify LEFAH homepage title
  console.log("Title:", await page.title());
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
  await expect(page.getByRole('heading', { name: 'Create New Form AP Hours' })).toBeVisible(); // title of fah screen
  await expect(page.getByText("Issuer Name")).toBeVisible(); // issuer name field
  await page.getByRole('combobox').filter({ hasText: 'Select a person' }).locator('div').first().click(); 
  await expect(page.getByText('Select CIK and Issuer Name')).toBeVisible();
  await page.locator('#people-picker-modal-container').getByRole('textbox').fill("test"); // search issuername/cik
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('row', { name: 'AEHR TEST SYSTEMS' }).click(); // select issuername in table
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByLabel('Fiscal Year End (mm/dd/yyyy)').isVisible(); //fiscal year end field
  const FYE = page.locator('.dsi.dsiCalendar').first();
  await FYE.click(); // open calendar
  await expect(FYE).toBeVisible();
   //select FYEtarget date
  const FYEyear='2025';
  const FYEmonth='Nov';
  const FYEdate='12';
  selectdate(FYEyear,FYEmonth,FYEdate,page,false);
  const expecteddate1= '11/12/2025'; // mm/dd/yyyy
  await page.waitForTimeout(3000);
  await page.getByLabel('Estimated Report Release Date').isVisible();// Estimated Report Release Date field
  const ERD = page.locator('.dsi.dsiCalendar').nth(1);
  await ERD.click(); // open calendar
  await expect(ERD).toBeVisible();
  //select ERDtarget date
  const ERDyear='2026';
  const ERDmonth='Nov';
  const ERDdate='12';
  selectdate(ERDyear,ERDmonth,ERDdate,page,true);
  const expecteddate2= '11/12/2026'; // mm/dd/yyyy
  await page.waitForTimeout(3000);
  await page.getByLabel('Form AP Due Date to NPPD').isVisible(); // Form AP Due Date to NPPD field
  const FADD = page.locator('.dsi.dsiCalendar').nth(2);
  await FADD.click();  // open calendar
  await expect(FADD).toBeVisible();
  //select FADDtarget date
  const FADDyear='2024';
  const FADDmonth='Nov';
  const FADDdate='12';
  selectdate(FADDyear,FADDmonth,FADDdate,page,false);
  const expecteddate3= '11/12/2025'; // mm/dd/yyyy
await page.waitForTimeout(3000);
await page.getByLabel('Signing Partner').isVisible(); // Signing Partner field
await page.locator('.hc-label-bold > .people-picker-container > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click();
//await page.locator('.coreSelectDropdown-selection__rendered').first().click();
await page.locator('#people-picker-modal-container').getByRole('textbox').fill(config.Signing_Partner);
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
await page.getByLabel('Engagement Quality Reviewer (EQR)').isVisible();// Engagement Quality Reviewer (EQR) field
await page.locator('div:nth-child(9) .coreSelectDropdown-selection__rendered').click();
await page.getByText('EQRSearch users by name or').isVisible();
await page.locator('#people-picker-modal-container').getByRole('textbox').fill(config.EQR)
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1002, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
await page.getByLabel('Country of the firm issuing the audit report').isVisible();
await page.locator('.dropDownWrapper > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click();
await page.getByRole('option', { name: 'Ireland' }).click();
await page.getByLabel('Firm Legal Name').isVisible();
await page.locator("input[class='text firm-lookup-input']").click();
await page.getByText('Select Legal Name of the Firm issuing the audit reportHeadquarters\' Country*').isVisible();
await page.getByRole('row', { name: 'BDO' }).click();
await page.getByRole('button', { name: 'Select Firm' }).click();
await page.getByRole('button', { name: 'CREATE' }).click(); // create button in fah screen
await page.getByText('In Progress').isVisible(); // FAH status
const FAHid=await page.locator("p",{hasText:"FAH"}).innerText(); // get FAH id
console.log("Created FAH id is:", FAHid); // print FAH id
// logout process
await page.locator('div').filter({ hasText: /^1$/ }).nth(1).click();  // user profile icon
await page.locator('div').filter({ hasText: /^Logout$/ }).click(); // logout option
})
