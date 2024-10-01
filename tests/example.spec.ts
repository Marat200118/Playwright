import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://playwright.dev/');
  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});

test('Test Portfolio website on iPhone 12', async ({ browser }) => {

  const iPhone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const page = await iPhone.newPage();
  
  await page.goto('https://www.marats-samigullins.com/portfolio');
  await page.screenshot({ path: 'screenshots/iphone-12.png' });

  await page.getByRole('heading', { name: 'About' }).click();
  await page.screenshot({ path: 'screenshots/iphone-12-about.png' });

  await page.getByRole('heading', { name: 'Skills' }).click();
  await page.screenshot({ path: 'screenshots/iphone-12-skills.png' });

  await page.getByRole('heading', { name: 'Education', exact:true }).click();
  await page.screenshot({ path: 'screenshots/iphone-12-education.png' });

  await page.getByRole('heading', { name: 'Projects', exact:true }).click();
  await page.screenshot({ path: 'screenshots/iphone-12-projects.png' });

  await page.getByRole('heading', { name: 'Contact', exact:true }).click();
  await page.screenshot({ path: 'screenshots/iphone-12-contact.png' });
  
});




test.describe('Responsive Design Test', () => {
  const devices = [
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ];

  devices.forEach(device => {
    test(`Test for ${device.name}`, async ({ page }) => {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto('https://www.example.com');

      // Add specific checks per device if needed
    });
  });
});


// test('Run Lighthouse audit on website', async ({ page }) => {
//   await page.goto('https://www.example.com');
//   const report = await playAudit({
//     page: page,
//     thresholds: {
//       performance: 50,
//       accessibility: 50,
//       'best-practices': 50,
//       seo: 50,
//       pwa: 50,
//     },
//     port: 9222,
//   });
//   console.log(report);
// });