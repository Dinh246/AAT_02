import {Page, Locator} from "@playwright/test";
import { Homepage } from "./Homepage";

export class ProductOverview extends Homepage{
    readonly page: Page;
    readonly firstProduct: Locator;

    constructor(page:Page){
        super(page);
        this.firstProduct = page.locator('.collection-detail__product-image > .w-100 >> nth=0');
    }

    async goToProductDetail(){
        await this.firstProduct.click();
    }
}