// iframe - it is an html document that allows you to embedded another html document within current document
import {test,expect,Locator} from "@playwright/test"
test("Verify frames demo ", async({page})=>{
await page.goto("https://ui.vision/demo/webtest/frames/");
// count no of frames present in the page
const frames=page.frames();
console.log("no of frames:", frames.length);
// Approach-1: using page.frame() - can use name and url
const frame=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
if(frame)
{
    await frame.locator("[name='mytext1']").fill("hello")
}
else{
    console.log("frame is not available");
}
await page.waitForTimeout(4000);
// Approach-2: using page.framelocator() - can use any locator
const textbox= page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']")
await textbox.fill("john");
await page.waitForTimeout(4000);
})

test.only("Verify inner/child frames ", async({page})=>{
await page.goto("https://ui.vision/demo/webtest/frames/");
const frame3=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
if(frame3)
{
    await frame3.locator("[name='mytext3']").fill("ravi");
    const childframes=frame3.childFrames();
    console.log("count childframes inside frame3:", childframes.length);
    const radio=childframes[0].getByLabel("I am a human");
    await radio.check(); // select radio button
    await expect(radio).toBeChecked(); // assertion
}
else{
 console.log("frame not found");
}
await page.waitForTimeout(3000);
})