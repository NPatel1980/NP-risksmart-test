Installation
To get started, follow these steps to install Playwright and its dependencies.

1.Clone the Repository:
Clone the project repository: git clone https://github.com/yourusername/NP-RISKSMART-TEST.git

2.Navigate to the Project Directory: cd NP-RISKSMART-TEST

3.Install Dependencies:
Ensure you have Node.js installed on your system.
Install Playwright and other dependencies by running:npm install

4.Install Playwright Browsers:
Playwright requires browser binaries to be installed. You can install them using:npx playwright install
(This will install Chromium, Firefox, and WebKit for running tests.)

Running Playwright Tests
Opening Playwright in UI Mode
Playwright has a UI mode that makes it easy to run and debug tests interactively.

To open Playwright in UI mode, run:npm run playwright:ui

Locating Tests
All test files are located in the tests/ directory. Each test suite is a .ts
Folder structure
/tests
├── homepage.spec.ts # Tests for homepage functionality
├── contactform.spec.ts # Tests for contact form validation
└── search.spec.ts # Tests for search functionality

Running All Tests
To run all the tests in the project, simply use the following command:npx playwright test

Running a Specific Test Suite
To run a specific test suite, use the following command format:npx playwright test tests/homepage.spec.ts (replace homepage.spec.ts with the file you require)

Running a Single Test
If you want to run a specific test within a test suite, you can use the -g option followed by the test name: For example, to run a test named "Navigate to the homepage" from homepage.test.ts:
npx playwright test tests/homepage.test.ts -g "Navigate to the homepage"

Running Tests in a Specific Browser
To run tests in a specific browser (Chromium, Firefox, or WebKit), you can use the --project option:
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

Run in Headed Mode (with visible browser window):npx playwright test --headed

Run Tests in Parallel:
Playwright can run tests in parallel by default, but you can control the number of workers using:npx playwright test --workers=2

Generate HTML Report:
Playwright generates an HTML report after tests are executed. To open the report:npx playwright show-report

Project creation notes
The approach was to create a separate suite for each page, or specific are of functionality. If I were to extend the pack I would have suites for navigation, sign-up, log-in etc.

homepage.spec.ts
I created a couple of tests without comments and one with comments, depending on the coding standards you have in place.

contactForm.spec.ts
One test completes the form in full, another tests that an invalid email cannot be submitted, as this fails and error is displayed.

searchFunctionality.ts
This contains a failing test, due to no search field being present.

navigation.ts
I created one simple helper function that navigates to the homepage and asserts you are on the homepage.
