const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  });

test('First Playwright test case', async ({page}) => {
// const context = await browser.newContext();
// const page = await context.newPage();
// await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

await page.locator('div > #username').fill('rahulshetty');
await page.locator('div > #password').fill('learning');
await page.locator('div > #signInBtn').click();

await expect(page.locator('[class="alert alert-danger col-md-12"]')).toHaveText('Incorrect username/password.');

console.log(await page.locator('[class="alert alert-danger col-md-12"]').textContent());

await page.waitForTimeout(3000);
});

test('Logging into the application', async ({page}) => {
    await page.locator('div > #username').fill("");
    await page.locator('div > #username').fill('rahulshettyacademy');
    await page.locator('div > #password').fill('learning');
    await page.locator("//select[@class='form-control']").selectOption('Teacher');
    await page.locator('div > #signInBtn').click();
    await expect(page.locator("//h1[text()= 'Shop Name']")).toBeVisible();
    await page.waitForLoadState('networkidle'); //waiting to network call tob be idle
    console.log(await page.locator('.card-body a').allTextContents());
});

test.only('UI control test case', async ({page}) => {
  page.waitForSelector("//select[@class='form-control']");
  page.on('dialog', dialog => {
    console.log(dialog.message());
    dialog.accept();
  })
});
