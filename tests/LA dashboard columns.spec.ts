import {test,expect, chromium} from "@playwright/test"
test("LEFAH login page", async({page})=>{
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
// navigate to LA dashboard and verify columns
await page.getByAltText("Group Engagement dashboard").click(); // LA dashboard
await page.locator('div').filter({ hasText: /^Issuer Name$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Fiscal Year End$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Estimated Report Release Date$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Form AP Approval Due Date$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Form AP Hours Record Status$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Form AP Hours Record$/ }).isVisible();
await page.locator('div').filter({ hasText: /^My Role$/ }).isVisible();
await page.locator('div').filter({ hasText: /^Country Name$/ }).isVisible();

})