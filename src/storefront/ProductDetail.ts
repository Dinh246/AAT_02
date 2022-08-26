import {Page, Locator} from '@playwright/test';
import { ProductOverview } from './ProductOverview';

export class ProductDetail extends ProductOverview{
    readonly page: Page;
    readonly realtimeVisitorsEle: Locator;
    readonly realtimeVisitorsNumEle: Locator;

    constructor(page: Page){
        super(page);
        this.realtimeVisitorsEle = page.locator('.copt-realtime-visitors');
        this.realtimeVisitorsNumEle = page.locator('.copt-realtime-visitors__number');
    }


}