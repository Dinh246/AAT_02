import { Page, Locator } from '@playwright/test';

export type Credentials={
    email: string;
    password: string;
}

export class Login{
    readonly page: Page;
    readonly emailField: Locator;
    readonly pwField: Locator;
    readonly signInBtn: Locator;
    readonly shopSelectedELe: Locator;

    constructor( page: Page ){
        this.page = page;
        this.emailField = page.locator('[placeholder="example\@email\.com"]');
        this.pwField = page.locator('[placeholder="Password"]');
        this.signInBtn = page.locator('button:has-text("Sign in")');
        this.shopSelectedELe = page.locator('text=qa-team >> nth=0')
    }

    async signInWithCredentials(info: Credentials){
        await this.emailField.fill(info.email);
        await this.pwField.fill(info.password);
        await this.signInBtn.click();
        await this.page.waitForNavigation();
    }

    async selectAShop(){
        await this.shopSelectedELe.click();
    }
}