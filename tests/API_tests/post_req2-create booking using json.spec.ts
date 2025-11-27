/*
Test: create booking
Request type: Post
Request body: json file
*/
import {test, expect} from "@playwright/test"
import fs from 'fs'
test("Create post request using json file", async({request})=>{
// read data from json (req body)
const jsonfile="testdata/post-reqbody.json";
const requestbody:any=JSON.parse(fs.readFileSync(jsonfile,'utf-8'));
// send post request
const response=await request.post("/booking",{data:requestbody});
const responsebody=await response.json(); // extract response
console.log(responsebody);
// validate status code and message
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);
// validate response body attributes
expect(responsebody).toHaveProperty("bookingid");
expect(responsebody).toHaveProperty("booking");
// validate booking details
const booking=responsebody.booking;
expect(booking).toMatchObject({
   firstname:requestbody.firstname,
   lastname:requestbody.lastname,
   totalprice:requestbody.totalprice,
   depositpaid: requestbody.depositpaid,
});
// validate booking dates
 expect(booking.bookingdates).toMatchObject({
    checkin: requestbody.bookingdates.checkin,
    checkout: requestbody.bookingdates.checkout,
   });
})
