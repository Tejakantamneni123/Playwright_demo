/*
Test: create booking
Request type: Post
Request body: static
*/
import {test, expect} from "@playwright/test"
test("Create post request using static body", async({request})=>{
// request body
const requestbody={
   firstname:"raviteja",
   lastname:"kantamneni",
   totalprice: 1200,
   depositpaid: true,
   bookingdates:{
    checkin: "2025-11-27",
    checkout: "2025-11-29"
   },
}
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
firstname:"raviteja",
   lastname:"kantamneni",
   totalprice: 1200,
   depositpaid: true,
});
// validate booking dates
 expect(booking.bookingdates).toMatchObject({
    checkin: "2025-11-27",
    checkout: "2025-11-29",
   });
})
