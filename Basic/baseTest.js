// Basic/baseTest.js
import baseFromFixture from '../Actions/fixture.js';  // this is your "fixture code" file
import { ActionTypes } from '../Utils/actions.js';
import { loginPageLocators } from '../pom/locatorObjects.js';
import { AppConfig } from '../config.js';

/**
 * Extend the shared fixture (actionHelper, verification, webAction, hooks)
 * with a `loggedIn` fixture that performs login.
 */
const test = baseFromFixture.extend({
  /**
   * loggedIn fixture:
   * - navigates to BaseURL (already done in beforeEach)
   * - performs login with configured credentials
   * - yields a logged-in page object
   */
  logIn: async ({ page, actionHelper }, use) => {
    // Perform login using correct ActionTypes (must match Utils/actions.js)
    await actionHelper.actionMethod(
      ActionTypes.SETTEXT,
      loginPageLocators.usernameField,
      AppConfig.UserName
    );

    await actionHelper.actionMethod(
      ActionTypes.SETTEXT,
      loginPageLocators.passwordField,
      AppConfig.Password
    );

    await actionHelper.actionMethod(
      ActionTypes.CLICK,
      loginPageLocators.signInButton
    );

    // Yield the logged-in page for tests
    await use(page);
  },
});

export default test;