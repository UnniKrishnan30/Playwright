import { test, expect } from '@playwright/test';

test('Proto Commerce exersise for get by locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.waitForLoadState('networkidle');

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("learning");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.waitForLoadState("networkidle");
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click(); //here {name: "Add"} this portion is not really needed, because this filtered card has only one button
    // await page.pause(3000);
});

test('Screenshot example and visual test example', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.screenshot({path: 'screenshot.png'});
    await page.waitForLoadState('networkidle');
    await page.screenshot({path: 'screenshot.png'});
    await page.getByLabel("Check me out if you Love IceCreams!").click();
});

test.only('Visual test example', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot()).toMatchSnapshot('visual-test.png');
});