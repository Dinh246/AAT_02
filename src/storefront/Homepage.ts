import {Page, Locator} from '@playwright/test'

export class Homepage{
    readonly page: Page;
    readonly furnitureBtn: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.furnitureBtn = page.locator('')
    }

    async goToNewArrivals(){
        await this.page.locator('text=Funiture >> nth=0').click();
    }
}