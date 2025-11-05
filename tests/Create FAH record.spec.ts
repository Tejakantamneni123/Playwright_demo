import {test,expect, chromium} from "@playwright/test"
test("Create FAH record", async({page})=>{
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
await page.waitForTimeout(5000);
await page.locator('.dsi.dsiCalendar').first().click();
await page.getByTitle('November 5, 2025').click();
await page.getByLabel('Estimated Report Release Date').isVisible();// Estimated Report Release Date field
await page.locator('.dsi.dsiCalendar').nth(1).click();
await page.getByTitle('Next month (PageDown)').click();
await page.getByTitle('December 10, 2025').click();
await page.getByLabel('Form AP Due Date to NPPD').isVisible();// Form AP Due Date to NPPD field
await page.locator('.dsi.dsiCalendar').nth(2).click();
await page.getByTitle('Previous month (PageUp)').click();
await page.getByTitle('October 8, 2025').click();


})