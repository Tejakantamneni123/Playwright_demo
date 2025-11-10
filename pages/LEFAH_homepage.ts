import { Page, expect, Locator } from "@playwright/test";
export class LEFAH_Homepage {
    private readonly page: Page;

    //locators
    private readonly getstartedLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getstartedLink = page.getByRole("button", { name: "get started " });
    }

    // action methods
    async ishomepageexists() {
        let title:string= await this.page.title();
        if(title)
        { 
            return true
        }
        return false;
}
 // click on get started link
    async clickgetstartedlink() {
        try{
        await this.getstartedLink.click();
        } catch (error) {   
            console.error("Error clicking get started link:", error);
            throw error; 
        }
    }
}