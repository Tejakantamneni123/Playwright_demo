import {test,expect,Locator,Page} from "@playwright/test"
test.only("Create FAH record", async({page})=>{
await page.goto("https://qtopportalweb.aaps.deloitte.com/");
// click on get started link
await page.getByRole("button",{name:"get started "}).click();
// filling login details
await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('LEFAHTest1014@deloitte.com'); // email field
await page.getByRole('button', { name: 'Next' }).click(); // next button 
await page.getByRole('textbox', { name: 'Enter the password for' }).fill('NH@mA4g3$pn?qZF!');// password field
await page.getByRole('button', { name: 'Sign in' }).click();; // sign-in button
// navigate to LA dashboard
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
await page.waitForTimeout(3000);
await page.locator('.dsi.dsiCalendar').first().click();
await page.getByTitle('November 5, 2025').click(); // current month
await page.getByLabel('Estimated Report Release Date').isVisible();// Estimated Report Release Date field
await page.locator('.dsi.dsiCalendar').nth(1).click();
await page.getByTitle('Next month (PageDown)').click(); // next month
await page.getByTitle('December 10, 2025').click();
await page.getByLabel('Form AP Due Date to NPPD').isVisible();// Form AP Due Date to NPPD field
await page.locator('.dsi.dsiCalendar').nth(2).click();
await page.getByTitle('Previous month (PageUp)').click(); // previous month
await page.getByTitle('October 8, 2025').click();
await page.getByLabel('Signing Partner').isVisible(); // Signing Partner field
await page.locator('.coreSelectDropdown-selection__rendered').first().click();
await page.locator('#people-picker-modal-container').getByRole('textbox').fill("LEFAHTest1014@deloitte.com")
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
await page.getByRole('button', { name: 'CONTINUE' }).click();
await page.getByLabel('Engagement Quality Reviewer (EQR)').isVisible();// Engagement Quality Reviewer (EQR) field
await page.locator('div:nth-child(9) .coreSelectDropdown-selection__rendered').click();
await page.getByText('EQRSearch users by name or').isVisible();
await page.locator('#people-picker-modal-container').getByRole('textbox').fill("LEFAHTest1014@deloitte.com")
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'L1 1014, LEFAHTest' }).click();
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
const FAHid=await page.locator("p",{hasText:"FAH"}).innerText();
console.log("Created FAH id is:", FAHid);
});
