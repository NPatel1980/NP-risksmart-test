import { test, expect, chromium } from '@playwright/test';
import { navigateToHomepage } from '../Helpers/navigation';

test.describe('Demoblaze Homepage', () => {});

test('Navigate to the homepage', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  const carousel = page.locator('#carouselExampleIndicators');
  await expect(carousel).toBeVisible();

  const categoriesList = page.locator('#cat');
  await expect(categoriesList).toBeVisible();
});

test('Navigate to the laptops category', async ({ page }) => {
  await navigateToHomepage(page);

  await page.click('a:has-text("Laptops")');

  await expect(
    page.locator('.card-title').filter({ hasText: 'MacBook Pro' })
  ).toBeVisible();
  await expect(
    page.locator('.card-title').filter({ hasText: '2017 Dell 15.6 Inch' })
  ).toBeVisible();
});

test('Select a laptop and verify product details appear', async ({ page }) => {
  await navigateToHomepage(page);
  await page.click('a:has-text("Laptops")');

  await page.click('a:has-text("MacBook air")');

  await expect(page.locator('h2')).toHaveText('MacBook air');
  await expect(
    page.locator('#more-information:has-text("1.6GHz dual-core Intel Core i5")')
  ).toBeVisible();
});

test('Add a laptop to the cart and verify', async ({ page }) => {
  // open the homepage
  await navigateToHomepage(page);

  // navigate to the laptops category
  await page.click('a:has-text("Laptops")');

  // Select one of the laptops
  await page.click('a:has-text("MacBook Pro")');

  // Add the laptop to the cart and handle the alert that appears
  const dialogPromise = page.waitForEvent('dialog');
  await page.click('a:has-text("Add to cart")'); // Trigger the dialog
  const dialog = await dialogPromise;
  await dialog.accept();

  // Assert that the cart now contains the item with the correct price
  await page.click('#cartur');
  await expect(page.locator('.success >> text="MacBook Pro"')).toBeVisible();
  await expect(page.locator('.success >> text="1100"')).toBeVisible();
  await expect(page.locator('#totalp >> text="1100"')).toBeVisible();
});
