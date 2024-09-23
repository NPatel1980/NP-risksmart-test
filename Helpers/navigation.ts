import { Page, expect } from '@playwright/test';

// Helper function to verify homepage elements
export async function navigateToHomepage(page: any) {
  await page.goto('https://www.demoblaze.com/index.html');

  // Assert carousel and categories list are visible
  const carousel = page.locator('#carouselExampleIndicators');
  await expect(carousel).toBeVisible();

  const categoriesList = page.locator('#cat');
  await expect(categoriesList).toBeVisible();
}
