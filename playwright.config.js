// @ts-check
const { devices } = require('@playwright/test');
const { takeScreenshot } = require('wd/lib/commands');
//import { sharePointUserData } from './config.js';
import { AppConfig } from './config.js';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',

  // globalTeardown: require.resolve('./global-teardown'),
  // globalTeardown: "./global-teardown",
  /* Maximum time one test can run for. */
  timeout: 100 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 :undefined,
  // Concise 'YourReporter' for CI, default 'list' when running locally
  reporter: process.env.CI ? [['./Utils/yourReporter.js'],
                              ['junit', { outputFile: 'results.xml' }],
                              ['html', { open: 'never' }] ]
                              : 'html',

  // retries: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'allure-playwright',
  // reporter: 'html',
  // reporter: [['json', { outputFile: 'results.json' }]],
  // reporter: './Utils/yourReporter.js',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    // actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',


    /* this will take the screenshot & video only when test case fails and store that in the test/results folder */
    // video:"retain-on-failure",
    video: "on",
    screenshot: 'on',
    headless: false
    },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        launchOptions: {
          slowMo: 1000,
          args: ['--auth-server-allowlist="_"']
        },
        ...devices['Desktop Chrome'],
        viewport: {width:1530,height:722},
        httpCredentials: {
          username: process.env.OUTLOOK_USERNAME || AppConfig.UserName,
          password: process.env.OUTLOOK_PASSWORD || AppConfig.Password,
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     launchOptions:{
    //       args:["--start-maximized"],
    //        headless:false,
    //     },
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     launchOptions:{
    //       args:["--start-maximized"],
    // headless:false,
    //     },
    // trace: 'retain-on-failure',
    //     ...devices['Desktop Safari'],
    //   },
    // },

  ],

};

module.exports = config;
