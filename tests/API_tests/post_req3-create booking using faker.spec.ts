/*
Test: create booking
Request type: Post
Request body: dynamic/random data using faker library
command - npm install @faker-js/faker
npm install luxon - deal with dates need to install luxon library
*/
import {test, expect} from "@playwright/test"
import {faker} from "@faker-js/faker";
import {DateTime} from 'luxon';
test("Create post request using faker library", async({request})=>{
// data generation using faker
const firstname=faker.person.firstName();
const lastname=faker.person.lastName();
const totalprice=faker.number.int({min:100, max:5000});
const depositpaid=faker.datatype.boolean();
const checkin=DateTime.now().toFormat("yyyy-MM-dd");
const checkout=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");
// request body
const requestbody={
   firstname:firstname,
   lastname:lastname,
   totalprice: totalprice,
   depositpaid: depositpaid,
   bookingdates:{
    checkin: checkin,
    checkout: checkout
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
