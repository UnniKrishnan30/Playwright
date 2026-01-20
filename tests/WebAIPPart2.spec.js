const { test, expect } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('//h1[text()="Log in"]').waitFor();
    await page.locator('#userEmail').fill('rachin@gmail.com');
    await page.locator('#userPassword').fill('Rachin@1234');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //waiting to network call tob be idle
    await context.storageState({ path: 'storageState.json' });
    webContext = await browser.newContext({ storageState: 'storageState.json' });
});


test('Logging into the application', async ({ page }) => {

    console.log(await page.locator('.card-body b').allTextContents());
});