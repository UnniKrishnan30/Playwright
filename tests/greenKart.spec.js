import { test, expect } from '@playwright/test';

test('Calender validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');


    await expect(page.locator('#displayed-text'), "Expect text box to be displayed").toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator('#displayed-text'), "Expect text box to be hidden").toBeHidden();
    await page.locator("#confirmbtn").click();
    await page.pause();
    await page.on("dialog", dialog => dialog.accept());
    await page.locator("#mousehover").hover();
    const framepage = page.frameLocator("#courses-iframe");
    await framepage.locator("a[href*='lifetime-access']:visible").click();
})