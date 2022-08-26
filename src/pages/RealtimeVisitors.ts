import { Page, Locator } from "@playwright/test";
import { DashBoard } from "./DashBoard";

export type Settings = {
    minVisitors: string;
    maxVisitors: string;  
}

export type Customize = {
    textColor: string;
    backgroundColor: string;
    numberColor: string;
    fontSize: string;
    type: string;
    fontIndex: number;
}

export class RealtimeVisitors extends DashBoard {

    readonly page: Page;
    readonly realtimeVisitorEle: Locator;
    readonly customizeEle: Locator;
    readonly switchOnOffBtn: Locator;
    readonly changeBtn: Locator;
    readonly showForAllBtn: Locator;
    readonly showForSomeBtn: Locator;
    readonly minInputField: Locator;
    readonly maxInputField: Locator;
    readonly editToast: Locator;
    readonly popType: Locator;
    readonly textColorField: Locator;
    readonly backgroundColorField: Locator;
    readonly numberColorField: Locator;
    readonly typeOptions: Locator;
    readonly fontOptions: Locator;
    readonly fontSizeField: Locator;
    readonly previewTextEle: Locator;
    readonly previewNumberEle: Locator;
    readonly textColorMess: Locator;
    readonly backgroundColorMess: Locator;
    readonly numberColorMess: Locator;
    readonly fontSizeMess: Locator;
    readonly realtimeVisitorCustomizeSection: Locator;

    constructor( page: Page ){
        super(page);
        this.page = page;
        this.realtimeVisitorEle = page.locator('text=Real-time visitors');
        this.customizeEle = page.locator('text=Customize');
        this.switchOnOffBtn = page.locator('.s-check >> nth=0');
        this.changeBtn = page.locator('button:has-text("Change")');
        this.showForAllBtn = page.locator('.s-radio > .s-check >> nth=0');
        this.showForSomeBtn = page.locator('div:nth-child(2) > .s-radio > .s-check');
        this.minInputField = page.locator('input[type="number"] >> nth=0');
        this.maxInputField = page.locator('input[type="number"] >> nth=1');
        this.editToast = page.locator('text=Your settings was updated successfully');
        this.popType = page.locator('h2:has-text("Pop types")');
        this.textColorField = page.locator('input[type="text"] >> nth=3');
        this.backgroundColorField = page.locator('input[type="text"] >> nth=4');
        this.numberColorField = page.locator('input[type="text"] >> nth=5');
        this.typeOptions = page.locator('//*[@value="fill"]/parent::select');
        this.fontOptions = page.locator('//*[@class="card__section"]//following-sibling::div[4]/descendant::select');
        this.fontSizeField = page.locator('input[type=number] >> nth=2');
        this.previewTextEle = page.locator('.s-my32');
        this.previewNumberEle = page.locator('.copt-realtime-visitors__number');
        this.realtimeVisitorCustomizeSection = page.locator('#app-list >> text=Real-time visitors');
        this.textColorMess = page.locator('.s-form-item__error >> nth=0');
        this.backgroundColorMess = page.locator('text=Background color is required');
        this.numberColorMess = page.locator('.s-form-item__error >> nth=2');
        this.fontSizeMess = page.locator('.s-form-item__error >> nth=3');
    }
    
    async goToSettings(){
        await this.realtimeVisitorEle.click();
    }

    async turnOnRealtimeVisitors(){
        if(await this.switchOnOffBtn.isChecked() == false){
            await this.switchOnOffBtn.click();
            await this.saveBtn.click();
        }
    }

    async editSettings(info: Settings){
        await this.changeBtn.click();
        await this.minInputField.fill(info.minVisitors);
        await this.maxInputField.fill(info.maxVisitors);
        await this.saveBtn.click();
    }

    async turnOnShowForAllProducts(){
        if(await this.showForSomeBtn.isChecked() == true){
            await this.showForAllBtn.click();
            await this.saveBtn.click();
        }
    }

    async goToCustomize(){
        await this.customizeEle.click();
        await this.page.waitForSelector('#app-list >> text=Real-time visitors');
    }

    async customizeRealtimeVisitors(info: Customize){
        await this.textColorField.scrollIntoViewIfNeeded();
        await this.textColorField.fill(info.textColor);
        await this.backgroundColorField.scrollIntoViewIfNeeded();
        await this.backgroundColorField.fill(info.backgroundColor);
        await this.numberColorField.scrollIntoViewIfNeeded();
        await this.numberColorField.fill(info.numberColor);
        await this.typeOptions.scrollIntoViewIfNeeded();
        await this.typeOptions.selectOption(info.type);
        await this.fontOptions.scrollIntoViewIfNeeded();
        await this.fontOptions.selectOption({index: info.fontIndex});
        await this.fontSizeField.scrollIntoViewIfNeeded();
        await this.fontSizeField.fill(info.fontSize);
        await this.saveBtn.click();
    }
}