import { test, expect } from '@playwright/test';
import { navigateToHomepage } from '../Helpers/navigation';

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToHomepage(page);
    await page.click('a:has-text("Contact")');
  });

  // Unable to accept the dialog, using dismiss instead but added a console log to show the dialog message
  test('Submit contact form and dismiss dialog with message logging', async ({
    page,
  }) => {
    // Fill in the contact form
    await page.fill('#recipient-email', 'test@example.com');
    await page.fill('#recipient-name', 'John Doe');
    await page.fill('#message-text', 'This is a test message.');

    // Set up the dialog handler before submitting the form
    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());

      // Dismiss the dialog instead of accepting it
      await dialog.dismiss();
    });

    // Submit the form
    await page.click('button:has-text("Send message")');
  });

  test('Validate email field: Invalid email format', async ({ page }) => {
    // Fill the contact form with an invalid email
    await page.fill('#recipient-email', 'invalid-email');
    await page.fill('#recipient-name', 'John Doe');
    await page.fill('#message-text', 'This is a test message.');

    // Set up the dialog handler
    let formSubmittedWithInvalidEmail = false;
    page.on('dialog', async (dialog) => {
      const dialogMessage = dialog.message();

      // Check if the dialog message indicates the form was submitted with an invalid email
      if (dialogMessage.includes('Please enter a valid email address')) {
        console.log('Validation worked: Invalid email format was detected.');
      } else {
        formSubmittedWithInvalidEmail = true;
        console.log('The form was submitted with an invalid email.');
      }

      await dialog.dismiss();
    });

    // Submit the form
    await page.click('button:has-text("Send message")');

    // Optionally wait for confirmation of dialog handling
    await page.waitForTimeout(2000);

    // If the form was submitted with an invalid email, fail the test with a custom message
    if (formSubmittedWithInvalidEmail) {
      throw new Error(
        'The form was incorrectly submitted with an invalid email.'
      );
    }
  });
});
