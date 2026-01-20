// const { test, expect, request } = require('@playwright/test');
// const payLoad = {userEmail: "rachin@gmail.com", userPassword: "Rachin@1234"}
// let token;
// test.beforeAll(async () => {
//     const apiContext = await request.newContext();
//     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: payLoad});
//     expect(loginResponse.ok()).toBeTruthy();
//     const loginResponseJson = await loginResponse.json();
//     token = loginResponseJson.token;
//     console.log(token);
//   });

// test('First Playwright test case', async ({page}) => {
// // const context = await browser.newContext();
// // const page = await context.newPage();
// // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
// console.log(await page.title());
// await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

// // await page.locator('div > #username').fill('rahulshetty');
// // await page.locator('div > #password').fill('learning');
// // await page.locator('div > #signInBtn').click();

// await expect(page.locator('[class="alert alert-danger col-md-12"]')).toHaveText('Incorrect username/password.');

// console.log(await page.locator('[class="alert alert-danger col-md-12"]').textContent());

// await page.waitForTimeout(3000);
// });

const { test, expect, request } = require('@playwright/test');
const payLoad = { userEmail: "rachin@gmail.com", userPassword: "Rachin@1234" }
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: payLoad });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test('First Playwright test case', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");


    await expect(page.locator('[class="alert alert-danger col-md-12"]')).toHaveText('Incorrect username/password.');

    console.log(await page.locator('[class="alert alert-danger col-md-12"]').textContent());

    await page.waitForTimeout(3000);
});