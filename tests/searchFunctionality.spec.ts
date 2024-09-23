import { test, expect } from '@playwright/test';
import { navigateToHomepage } from '../Helpers/navigation';

test.describe('Search Functionality Tests', () => {
  // Navigate to the Contact page before each test
  test.beforeEach(async ({ page }) => {
    await navigateToHomepage(page);
  });

  test('Search for "Laptop" and verify results', async ({ page }) => {
    const searchField = page.locator('input[placeholder="Search"]');
    const isSearchFieldVisible = await searchField.isVisible();

    if (!isSearchFieldVisible) {
      // Take a screenshot and throw an error if the search field is not present
      await page.screenshot({
        path: `search-field-not-found-${Date.now()}.png`,
      });
      throw new Error(
        'Search field not present on the page. Screenshot captured.'
      );
    }
  });
});
