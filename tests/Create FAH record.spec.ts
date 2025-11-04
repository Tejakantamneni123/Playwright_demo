import {test,expect, chromium} from "@playwright/test"
test("Create FAH record", async({page})=>{
await page.goto("https://qtopportalweb.aaps.deloitte.com/");
await page.waitForLoadState();
// click on get started link
await page.getByRole("button",{name:"get started "}).click();
// filling login details
await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('LEFAHTest1014@deloitte.com'); // email field
await page.getByRole('button', { name: 'Next' }).click(); // next button 
await page.getByRole('textbox', { name: 'Enter the password for' }).fill('NH@mA4g3$pn?qZF!');// password field
await page.getByRole('button', { name: 'Sign in' }).click();; // sign-in button
await page.waitForTimeout(5000);
// navigate to LA dashboard
await page.getByAltText("Group Engagement dashboard").click(); // LA dashboard
await page.getByText('CREATE NEW FORM AP HOURS RECORD').click(); // create new fah button
await page.waitForTimeout(5000);
await expect(page.getByRole('heading', { name: 'Create New Form AP Hours' })).toBeVisible(); // title of fah screen
await expect(page.getByText("Issuer Name")).toBeVisible(); // issuer name field
await page.getByRole('combobox').filter({ hasText: 'Select a person' }).locator('div').first().click(); 
await expect(page.getByText('Select CIK and Issuer Name')).toBeVisible();
await page.locator('#people-picker-modal-container').getByRole('textbox').fill("test"); // search issuername/cik
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('row', { name: 'AEHR TEST SYSTEMS' }).click(); // select issuername in table
await page.getByRole('button', { name: 'CONTINUE' }).click();





})