import {test, expect} from '../src/fixtures/MyFixtures';

test('Test quick login via Token', async ({ dashBoardViaAPI, page }) => {
    await expect(page).toHaveTitle('qa-team ~ Home ~ ShopBase');
    await dashBoardViaAPI.openBoostConvertApp();
    await expect(page).toHaveURL(/.*boost-convert/);
})
