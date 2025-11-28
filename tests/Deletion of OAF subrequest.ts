import {test,expect,Locator,chromium, Page} from "@playwright/test"
import { Testconfig } from "../pages/LEFAH_test_parameters"
import { LEFAH_Homepage } from "../pages/LEFAH_homepage"
import { selectdate } from "../pages/FAH-datepicker_module"
test('Deletion of OAF subrequest', async() => {
const browser = await chromium.launch();
const context = await browser.newContext(); // Incognito
const page = await context.newPage();
const config = new Testconfig();
  await page.context().clearCookies({name:'Here’s how we use cookies'}); // Clear cookies
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
  await expect(page.getByRole('heading', { name: 'Create New Form AP Hours' })).toBeVisible(); // title of fah screen
  await expect(page.getByText("Issuer Name")).toBeVisible(); // issuer name field
  await page.getByRole('combobox').filter({ hasText: 'Select a person' }).locator('div').first().click(); 
  await expect(page.getByText('Select CIK and Issuer Name')).toBeVisible();
  await page.locator('#people-picker-modal-container').getByRole('textbox').fill("AEHR"); // search issuername/cik
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('row', { name: 'AEHR TEST SYSTEMS' }).click(); // select issuername in table
  await page.getByRole('button', { name: 'CONTINUE' }).click();
  await page.waitForTimeout(4000);
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
  await page.waitForTimeout(4000);
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
  await page.waitForTimeout(4000);
  await page.getByLabel('Form AP Due Date to NPPD').isVisible(); // Form AP Due Date to NPPD field
  const FADD = page.locator('.dsi.dsiCalendar').nth(2);
  await FADD.click();  // open calendar
  await expect(FADD).toBeVisible();
  //select FADDtarget date
  const FADDyear='2024';
  const FADDmonth='Nov';
  const FADDdate='12';
  selectdate(FADDyear,FADDmonth,FADDdate,page,false);
  const expecteddate3= '11/12/2024'; // mm/dd/yyyy
  await page.waitForTimeout(4000);
await page.getByLabel('Signing Partner').isVisible(); // Signing Partner field
await page.locator('.hc-label-bold > .people-picker-container > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click();
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
await page.waitForTimeout(5000);
// Verification of FAH creation
await page.getByText('In Progress').isVisible(); // FAH status
const FAHid=await page.locator("p",{hasText:"FAH-"}).innerText(); // get FAH id
console.log("Created FAH id is:", FAHid); // print FAH id
// Navigate to Other Accounting Firms — Requests for Hours Sent by Lead Auditor section
await page.getByRole('button', { name: 'Other Accounting Firms — Requests for Hours Sent by Lead Auditor' }).click();
await page.locator('#oaf-hr-request-table').getByRole('button', { name: 'Actions' }).click();
await page.getByText('Add Request').click();
await page.getByRole('heading', { name: 'Add Other Accounting Firm -Request' }).isVisible();
await expect(page.getByText('Name', { exact: true })).toBeVisible();
await page.getByRole('textbox').first().fill('OAF Mainreq');
await expect(page.getByText('Status')).toBeVisible();
await expect(page.getByText('Not Sent')).toBeVisible();
await page.getByText('Other Accounting Firm Country', { exact: true }).isVisible();
await page.locator('.coreSelectDropdown-selection__rendered').first().click();
await page.getByRole('option', { name: 'Kazakhstan' }).click();
await page.getByText('Network Type*').isVisible();
await expect(page.getByText('DTTL Network', { exact: true })).toBeVisible();
await page.getByText('Other Accounting Firm Name').isVisible();
await page.getByRole('textbox').nth(1).click();
await page.getByText('Select Other Accounting Firm').isVisible();
await page.getByText('Headquarters\' Country').isVisible();
await page.getByRole('row', { name: 'FOR OWSHIP info2' }).click();
await page.getByRole('button', { name: 'Select Firm' }).click();
await page.getByLabel('What is the nature of the procedures performed for the hours reported in this request?').isVisible(); // NOP field
await page.getByRole('textbox').nth(4).fill('tester');
// Add OAF-Preparer
await page.getByLabel('Other Accounting Firm Preparer').isVisible(); 
await page.locator('.inputContainer > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1014@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
//  Add OAF-Partner
await page.getByLabel('Other Accounting Firm Partner').isVisible(); 
await page.locator('div:nth-child(11) > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1014@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
// Add OAF-EQR
await page.getByLabel('Engagement Quality Reviewer (EQR) (Optional)').isVisible(); 
await page.locator('div:nth-child(12) > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1011@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1011, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
// Hours Request Due Date (mm/dd/yyyy) field
await page.getByLabel('Hours Request Due Date (mm/dd/yyyy)').isVisible(); 
const HRD1 = page.locator('.dsi.dsiCalendar').first();
await HRD1.click(); // open calendar
await expect(HRD1).toBeVisible();
// select HRDtarget date
const HRD1year='2024';
const HRD1month='Oct';
const HRD1date='17'; 
selectdate(HRD1year,HRD1month,HRD1date,page,false);
const HRD1expecteddate= '17/10/2024'; // mm/dd/yyyy
await page.waitForTimeout(4000);
// select gating question
await expect(page.locator('.gating-qn-label')).toBeVisible();
//await page.locator("label[for='undefined-no']").click(); // select No option
await page.locator("label[for='undefined-yes']").click(); // select Yes option
// adding sub-request
await expect(page.getByRole('heading', { name: 'Request Hours from Other Accounting Firm(s)' })).toBeVisible();
await page.getByRole('button', { name: 'ADD REQUEST' }).click();
// notice popup
await expect(page.getByRole('heading', { name: 'Notice'})).toBeVisible();
await page.getByRole('button', { name: 'OK' }).click();
// sub-request screen
await page.getByRole('heading', { name: 'Add Other Accounting Firm -Request' }).isVisible();
await expect(page.getByText('Name', { exact: true })).toBeVisible();
await page.getByRole('textbox').first().fill('OAF Subreq');
await expect(page.getByText('Status')).toBeVisible();
await expect(page.getByText('Not Sent')).toBeVisible();
await page.getByText('Other Accounting Firm Country', { exact: true }).isVisible();
await page.locator('.coreSelectDropdown-selection__rendered').first().click();
await page.getByRole('option', { name: 'Kazakhstan' }).click();
await page.getByText('Network Type*').isVisible();
await expect(page.getByText('DTTL Network', { exact: true })).toBeVisible();
await page.getByText('Other Accounting Firm Name').isVisible();
await page.getByRole('textbox').nth(1).click();
await page.getByText('Select Other Accounting Firm').isVisible();
await page.getByText('Headquarters\' Country').isVisible();
await page.getByRole('row', { name: 'FOR OWSHIP info2' }).click();
await page.getByRole('button', { name: 'Select Firm' }).click();
await page.getByLabel('What is the nature of the procedures performed for the hours reported in this request?').isVisible(); // NOP field
await page.getByRole('textbox').nth(4).fill('tester');
// Add OAF-Preparer
await page.getByLabel('Other Accounting Firm Preparer').isVisible(); 
await page.locator('.inputContainer > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').first().click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1014@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
//  Add OAF-Partner
await page.getByLabel('Other Accounting Firm Partner').isVisible(); 
await page.locator('div:nth-child(11) > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1014@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
// Add OAF-EQR
await page.getByLabel('Engagement Quality Reviewer (EQR) (Optional)').isVisible(); 
await page.locator('div:nth-child(12) > .textbox-wrapper > .inputContainer.general > .inputWrapperContainer > #dropdownParentContainer > .coreSelectDropdown > .coreSelectDropdown-selection > .coreSelectDropdown-selection__rendered').click();
await page.getByText('Search users by name or email.').isVisible();
await page.locator('.text.people-picker-table-search-text').fill('LEFAHTest1011@deloitte.com');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1011, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
// Hours Request Due Date (mm/dd/yyyy) field
await page.getByLabel('Hours Request Due Date (mm/dd/yyyy)').isVisible(); 
const HRD2 = page.locator('.dsi.dsiCalendar').first();
await HRD2.click(); // open calendar
await expect(HRD2).toBeVisible();
// select HRDtarget date
const HRD2year='2024';
const HRD2month='Oct';
const HRD2date='17'; 
selectdate(HRD2year,HRD2month,HRD2date,page,false);
const HRD2expecteddate= '17/10/2024'; // mm/dd/yyyy
await page.getByRole('button', { name: 'SAVE' }).click(); // save button in sub-req screen
await page.waitForTimeout(5000);
await page.getByRole('button', { name: 'SAVE AND CLOSE' }).click(); // main req screen
await page.waitForTimeout(5000);
await page.getByRole('button', { name: 'Other Accounting Firms — Requests for Hours Sent by Lead Auditor' }).click();
// send request to OAF team members
await page.locator("div[aria-label='Select all Checkbox not checked']").click();
await page.locator('#oaf-hr-request-table').getByRole('button', { name: 'Actions' }).click();
await page.getByText('Send Request').click();
await expect(page.getByRole('heading', { name: 'Send Request'})).toBeVisible();
await page.getByRole('button', {name:'Submit Request'}).click();
await page.waitForTimeout(5000);
// verify created OAF record in table
const table:Locator=page.locator('.table-wrapper').first();
await expect(table).toBeVisible();
// count no of rows in a table
const rows:Locator[]=await table.locator(".dataTableRowsContainer .dataTableRow").all();
console.log("no of rows in table:", rows.length);
// count no of columns in a table
const columns:Locator[]=await table.locator(".dataTableCell").all();
console.log("no of columns in table:", columns.length);
// Verify oaf subreq and status
for (const row of rows)
{
 const secondrow:string= await row.locator(".dataTableRow").nth(1).innerText();
 console.log("second row in the table:", secondrow);
 if(secondrow.trim()=="OAF Subreq")
 {
  await expect(row.getByRole('gridcell', { name: 'OAF Subreq' })).toBeVisible();//  verify oaf-name
  await expect(row.getByRole('gridcell', { name: 'Hours Requested from OAF' })).toBeVisible(); // verify oaf-status
  break;
 }
 // open the Subreq and delete it
await page.getByRole('gridcell', { name: 'OAF Subreq' }).click();
await page.getByRole('button', { name: 'Actions' }).click();
await page.getByRole('button', {name:'Delete'}).click();
await expect(page.getByRole('heading', { name: 'Delete Confirmation'})).toBeVisible();// delete popup
await page.getByText('Delete').click();
await page.waitForTimeout(5000);
await expect(page.getByRole('gridcell', { name: 'OAF Subreq' })).not.toBeVisible();// verify deleted OAF-subrequest
}
});
