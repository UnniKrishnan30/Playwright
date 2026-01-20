const { test, expect } = require('@playwright/test');

test("Amazone page validation", async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[@placeholder='Search Amazon.in']").fill('laptops');
    await page.locator(".left-pane-results-container").waitFor();
    await page.locator("#sac-suggestion-row-1").click();
    await page.locator('//h2[text()="Results"]').waitFor();
    const label = await page.locator('(//div[contains(@class,"a-section a-spacing-small a-spacing-top-small")])[2]//span[contains(text(), "Dell Inspiron 3530 Laptop")]').textContent();
    expect(label, "Expect label to be displayed as expected").toBe(`Dell Inspiron 3530 Laptop, 13th Gen Intel Core i5-1334U Processor, 16GB, 512GB SSD, 15.6"(39.62cm) FHD 120Hz 250 nits, Backlit KB, Windows 11 + MSO'24 & 15 Month McAfee, Silver, Thin & Light- 1.62kg`);
});

