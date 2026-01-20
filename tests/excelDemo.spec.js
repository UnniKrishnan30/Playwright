import { test, expect } from '@playwright/test';
import {excel} from 'exceljs';

const excelWork = new excel.Workbook();
test('Excel Demo', async ({ page }) => {
    await page.goto('https://playwright.dev/');
});