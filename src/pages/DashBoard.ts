import { Page, Locator } from "@playwright/test";
import { Login } from "./Login";

export class DashBoard extends Login{

    readonly page: Page;
    readonly appsEle: Locator;
    readonly boostConvertEle: Locator;
    readonly saveBtn: Locator;
    readonly discardBtn: Locator;
    readonly switchBtn: Locator;

    constructor( page: Page ){
        super(page);
        this.appsEle = page.locator('text=Apps')
        this.boostConvertEle = page.locator('p:has-text("Boost Convert")')
        this.saveBtn = page.locator('button:has-text("Save")')
        this.discardBtn = page.locator('button:has-text("Discard")')
        this.switchBtn = page.locator('.s-check >> nth=2')
    }

    async saveChanges(){
        if(await this.saveBtn.isVisible()==true){
            await this.saveBtn.click();
        }
    }

    async discardChanges(){
        if(await this.discardBtn.isVisible()){
            await this.discardBtn.click();
        }
    }
    
    async openBoostConvertApp(){
        await this.appsEle.click();
        if(await this.switchBtn.isChecked()==false){
            await this.switchBtn.click();
        }
        await this.boostConvertEle.click();
    }
}