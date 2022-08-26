import { test, expect } from '../src/fixtures/MyFixtures'
require('dotenv').config();

test.describe('Display of Real-time Visitors in Storefront', () => {
    test('Display with default settings', async ({ realtimeVisitors, productDetail }) => {

        await test.step('Verify the Real-time visitors is On', async () => {
            await expect(realtimeVisitors.switchOnOffBtn.isChecked()).toBeTruthy();
        });

        await test.step('Go check Real-time visitors in store front', async () => {
            await expect(await productDetail.realtimeVisitorsEle).toContainText('people viewing this product right now');
        });

        await test.step('Verify the logic of random real-time visitors', async () => {
            await expect(await productDetail.realtimeVisitorsNumEle).toHaveValue(/[10-100]/);
        });
    });

    test('Edit customize and verify the changes by API', async ({ realtimeVisitors, request }) => {
        const textColorHex = "#ABC123";
        const backgroundColorHex = "#1A2B3C";
        const numberColorHex = "#DEF456";
        const type = 'outline';
        const fontIndex = 1;
        const fontSize = "20";
        const textColorRGB = "rgb(171, 193, 35)";
        const backgroundColorRGB = "rgb(26, 43, 60)";
        const numberColorRGB = "rgb(222, 244, 86)";

        await test.step('Edit customize with valid data', async () => {
            await realtimeVisitors.goToCustomize();
            await realtimeVisitors.realtimeVisitorCustomizeSection.scrollIntoViewIfNeeded();
            await realtimeVisitors.customizeRealtimeVisitors({
                textColor: textColorHex,
                backgroundColor: backgroundColorHex,
                numberColor: numberColorHex,
                type: type,
                fontIndex: fontIndex,
                fontSize: fontSize
            });
        })

        await test.step('Verify the text preview ', async () => {
            await expect(realtimeVisitors.previewTextEle).toHaveAttribute('style',
                `font-size: ${fontSize}px; color: ${textColorRGB}; font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;`)
        })

        await test.step('Verify the number preview', async () => {
            await expect(realtimeVisitors.previewNumberEle).toHaveAttribute('style',
                `color: ${numberColorRGB}; border-color: ${backgroundColorRGB};`)
        })

        await test.step('Verify with API', async () => {
            const response = await request.get('https://qa-team.onshopbase.com/admin/copt/countdown/customize.json', {
                headers: {
                    'x-shopbase-access-token': process.env.TOKEN!
                }
            })
            await expect(response.ok()).toBeTruthy();

            const jsonResponse = await response.json()
            const realtime_visitors = jsonResponse.settings.realtime_visitors;
            await expect(realtime_visitors).toMatchObject({
                text_color: textColorHex,
                background_color: backgroundColorHex,
                number_color: numberColorHex,
                type: type,
                font_family: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
                font_size: parseInt(fontSize)
            })
        })
    });

    test('Edit customize with invalid data', async ({ realtimeVisitors }) => {
        const invalidTextColor = '123456';
        const invalidBackGroundColor = '';
        const invalidNumberColor = '#TEST12';
        const type = 'none';
        const fontIndex = 1;
        const invalidFontSize = '7';

        await test.step('Go to Customize', async () => {
            await realtimeVisitors.goToCustomize();
        })

        await test.step('Enter invalid data', async () => {
            await realtimeVisitors.customizeRealtimeVisitors({
                textColor: invalidTextColor,
                backgroundColor: invalidBackGroundColor,
                numberColor: invalidNumberColor,
                type: type,
                fontIndex: fontIndex,
                fontSize: invalidFontSize,
            })
        })

        await test.step('Verify the warning messages', async () => {
            await expect(realtimeVisitors.textColorMess).toHaveText('Invalid color'),
            await expect(realtimeVisitors.backgroundColorMess).toHaveText('Background color is required'),
            await expect(realtimeVisitors.numberColorMess).toHaveText('Invalid color'),
            await expect(realtimeVisitors.fontSizeMess).toHaveText('Font size must be between 8 and 36')
        })
    })
});
