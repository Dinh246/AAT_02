import { test as base, expect } from "@playwright/test";
import { DashBoard } from "../pages/DashBoard";
import { Login } from "../pages/Login";
import { RealtimeVisitors } from "../pages/RealtimeVisitors";
import { Homepage } from "../storefront/Homepage";
import { ProductDetail } from "../storefront/ProductDetail";
import { ProductOverview } from "../storefront/ProductOverview";
require('dotenv').config();

export type MyFixtures = {
    login: Login;
    dashBoard: DashBoard;
    realtimeVisitors: RealtimeVisitors;
    homepage: Homepage;
    productDetail: ProductDetail;
    productOverview: ProductOverview;
}

export const test = base.extend<MyFixtures>({
    login: [async({ page }, use)=>{
        const login = new Login(page);
        await page.goto('https://accounts.shopbase.com/sign-in')
        await use(login);
    },  { timeout: 60000 }],

    dashBoard: async ({ page, login }, use) =>{
        const dashBoard = new DashBoard(page)
        await login.signInWithCredentials({
            email: process.env.EMAIL!,
            password: process.env.PASS!
        })
        await login.selectAShop();
        await page.waitForNavigation();
        await page.waitForSelector('text=Apps')
        await expect(page).toHaveTitle('qa-team ~ Home ~ ShopBase');
        await use(dashBoard);
        await page.close();
    },

    realtimeVisitors: async({ dashBoard, page }, use) =>{
        const realtimeVisitors = new RealtimeVisitors(page);
        await dashBoard.openBoostConvertApp();
        await page.waitForSelector('h2:has-text("Pop types")')
        await realtimeVisitors.goToSettings();
        await page.waitForSelector('.s-check >> nth=0')
        await realtimeVisitors.turnOnRealtimeVisitors();
        await use(realtimeVisitors);
        await page.close();
    },

    homepage: async ({ page }, use) =>{
        const homepage = new Homepage(page);
        await page.goto('https://qa-team.onshopbase.com/')
        await use(homepage);
        await page.close();
    },

    productOverview: async ({ homepage, page }, use) =>{
        const productOverview = new ProductOverview(page);
        await homepage.goToNewArrivals();
        await use(productOverview);
        await page.close();
    },

    productDetail: async ({ productOverview, page }, use) =>{
        const productDetail = new ProductDetail(page);
        await productOverview.goToProductDetail();
        await use(productDetail);
        await page.close();
    }
})

export { expect } from '@playwright/test';