import { test, expect } from '@playwright/test';

test('Demo snapshot', async ({ page }) => {
  await page.goto('https://qa-team.onshopbase.com/collections/new-arrivals/products/adler-8-light-chandelier-antiqued-gold');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('#detail-contents');
  await page.waitForSelector('//*[@alt="Trust badge" and @data-loaded="true"]');
  await expect(await page.screenshot({fullPage: true})).toMatchSnapshot("demo-screenshot-fullpage.png", {maxDiffPixelRatio: 0.03});
});
