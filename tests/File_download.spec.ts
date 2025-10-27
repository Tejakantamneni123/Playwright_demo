import {test,expect} from "@playwright/test"
import fs from 'fs';
test("file download", async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
await page.locator("#inputText").fill("tester");
await page.locator("#generateTxt").click();
const [download]=await Promise.all([page.waitForEvent('download'),page.locator("#txtDownloadLink").click()])
// save the file to custom path
const downloadpath='downloads/testfile.txt'
download.saveAs(downloadpath);
// check if file exits or not
const fileexist =fs.existsSync(downloadpath);
expect(fileexist).toBeTruthy;
await page.waitForTimeout(4000);
})