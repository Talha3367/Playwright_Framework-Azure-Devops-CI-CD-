import { test as base } from '@playwright/test';
import ActionsHelper from './actionHelper.js';
import VerifyActions from './verifyActions.js';
import WebActions from '../Utils/WebActions.js';
import Screenshot from '../Utils/Screenshot.js';
import { AppConfig } from '../config.js';

/**
 * Extend Playwright's base test to add custom fixtures/helpers for use in all tests.
 * This includes actionHelper, verification, and webAction helpers.
 */
const test = base.extend({
  /**
   * Provides an ActionsHelper instance for interacting with the page.
   * Usage in tests: ({ actionHelper }) => { ... }
   */
  actionHelper: async ({ page }, use) => {
    const helper = new ActionsHelper(page);
    await use(helper); // Makes the helper available to the test
  },

  /**
   * Provides a VerifyActions instance for performing verification/assertions.
   */
  verification: async ({ page }, use) => {
    const verify = new VerifyActions(page);
    await use(verify);
  },

  /**
   * Provides a WebActions instance for common web-related operations.
   */
  webAction: async ({ page }, use) => {
    const wa = new WebActions(page);
    await use(wa);
  }
});

/**
 * beforeEach hook runs before every test.
 * Navigates the browser to the base URL configured in AppConfig.
 */
test.beforeEach(async ({ webAction }) => {
  await webAction.navigateToURL(AppConfig.BaseURL);
});

/**
 * afterEach hook runs after every test.
 * Takes screenshots of all open pages in the browser context.
 * Logs the test name and status for debugging.
 * Uses Screenshot utility to save screenshots with test metadata.
 */
test.afterEach(async ({ context }, testInfo) => {
  const allPages = context.pages(); // Get all open pages/tabs in the browser context
  for (const page of allPages) {
    console.log(`Taking screenshot for test: "${testInfo.title}", status: ${testInfo.status}`);
    await Screenshot.takeScreenshot(
      page,                               // Page instance to capture
      `${testInfo.title} ${allPages.indexOf(page)}`,  // Screenshot name includes test title and page index
      testInfo.status,                    // Pass the test status (passed, failed, etc.)
      AppConfig.EnvName                   // Environment name for organizational purposes
    );
  }
});

// Export the extended test object for use in test files
export default test;
