// tests/patternsTests.js
import test from '../Basic/baseTest.js';
import { patternPageLocators, homePageLocators, XAgentsPageLocators } from '../pom/locatorObjects.js';
import { ActionTypes, AssertionType } from '../Utils/actions.js';
import { patternNames } from '../Helper/verifyHelper.js';


test.describe.parallel('All Tests', () => {

  test('TC01 - Login user & verify homepage', async ({ logIn: page, verification, actionHelper }) => {
    await verification.verifyActions(homePageLocators.homePageLogo, AssertionType.DISPLAYED);     // Verify home page logo
  });

  test('TC02 - Verify Patterns Page Contains All Pattern Cards', async ({ logIn: page, verification, actionHelper }) => {
    await verification.verifyActions(homePageLocators.homePageLogo, AssertionType.DISPLAYED);    // Verify home page logo
    await actionHelper.actionMethod(ActionTypes.CLICK, homePageLocators.patternsButton);    // Open Patterns page
    for (const name of patternNames) {
    await verification.verifyActions(`//p[normalize-space()='${name}']`, AssertionType.DISPLAYED);}   // Verify each pattern card is displayed
  });

  test('TC03 - Verify X-Agents Page & Pagination', async ({ logIn: page, verification, actionHelper }) => {
    await verification.verifyActions(homePageLocators.homePageLogo, AssertionType.DISPLAYED);   // Verify home page
    await actionHelper.actionMethod(ActionTypes.CLICK, sidebarLocators.XAgentsButton);     // Open X-Agents page
    await verification.verifyActions(XAgentsPageLocators.paginationText, AssertionType.CONTAINTEXT, '1 - 10 of 17 items');    // Verify pagination text
  });


});
