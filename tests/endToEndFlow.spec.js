import { test, expect, request } from '@playwright/test';
import data from '../testData/credentials.json';
import LoginPage from '../pageobjects/loginPage';
import ApiUtilities from '../tests/utils/apiUtils';
let payload = { userEmail: "rachin@gmail.com", userPassword: "Rachin@1234" };
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtilities = new ApiUtilities(apiContext, payload);
    token = await apiUtilities.getTocken(payload);
});


test('End-to-end flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    // await loginPage.loginMethod(data.username, data.password);
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("//button[text()=' Add To Cart']").first().waitFor();
    await expect(page.locator("//h3[text()='Automation']")).toBeVisible();
    // *****************************

    // ******Add to cart******
    let productTile = await page.locator(".card-body");
    for (let i = 0; i < await productTile.count(); i++) {
        if (await productTile.nth(i).locator("b").textContent() === 'iphone 13 pro') {
            await productTile.nth(i).locator("//button[text()=' Add To Cart']").click();
            break;
        }
    }
    // *****************************

    // ******Checkout flow******
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('iphone 13 pro')"), "Expect added product to be displayed").toBeVisible();
    await page.locator("//button[text()='Checkout']").click();
    await page.locator("//input[@placeholder='Select Country']").pressSequentially('ind', { delay: 100 });
    let options = await page.locator(".ta-results");
    await options.waitFor();
    let length = await options.locator("button").count();
    for (let i = 0; i < length; i++) {
        if (await options.locator("button").nth(i).locator("span").textContent() === ' India') {
            await options.locator("button").nth(i).locator("span").click();
            break;
        }
    }
    await expect(page.locator("//label[@type='text']")).toHaveText('rachin@gmail.com');
    await page.locator("//a[text()='Place Order ']").click();
    await page.locator('.hero-primary').waitFor();
    await expect(page.locator('.hero-primary'), "Expect success message to be displayed").toHaveText(' Thankyou for the order. ');
    let id = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(id);
    //*****************************

    // ******My Order**************

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("//h1[text()= 'Your Orders']").waitFor();

    const idList = await page.locator("tbody tr");
    const length1 = await idList.count();

    for (let i = 0; i < length1; i++) {
        const rowId = await idList.nth(i).locator("th").textContent();
        if (id.includes(rowId)) {
            await idList.nth(i).locator('.btn-primary').click();
            await page.locator(".email-title").waitFor();
            break;
        }
    }
    await expect(page.locator(".tagline").first()).toHaveText("Thank you for Shopping With Us");

    //*****************************
});




// rachin@gmail.com
// Rachin@1234