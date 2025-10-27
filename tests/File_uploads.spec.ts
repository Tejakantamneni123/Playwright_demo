import {test,expect} from "@playwright/test"
test("single file upload", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.locator("#singleFileInput").setInputFiles("uploads/LEFAH_Capac_April-Release 2026.xlsx");
await page.locator("button:has-text('Upload Single File')").click();
const msg=await page.locator("#singleFileStatus").textContent();
expect(msg).toContain("LEFAH_Capac_April-Release 2026.xlsx");
console.log("file uploaded successfully..")
await page.waitForTimeout(4000);
})
test.only("multiple files upload", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.locator("#multipleFilesInput").setInputFiles(["uploads/Internal bugs.docx","uploads/LEFAH_Concurrency OAF record.xlsx"])
await page.locator("button:has-text('Upload Multiple Files')").click();
const message=await page.locator("#multipleFilesStatus").textContent();
expect(message).toContain("Internal bugs.docx");
expect(message).toContain("LEFAH_Concurrency OAF record.xlsx");
console.log(message)
await page.waitForTimeout(4000);
})