import { ActionTypes } from '../Utils/actions.js';
import { policyTabLocators } from './locatorObjects.js';

/**
 * PolicyPage class encapsulates interactions with the Policy tab/page in the UI.
 * It provides methods to open tabs, enter search criteria, click buttons,
 * and expand dropdowns relevant to policy searching and validation.
 */
export class PolicyPage {
  /**
   * Constructor initializes the PolicyPage with Playwright page object and a helper for UI actions.
   * @param {import('playwright').Page} page - Playwright page object for browser interaction
   * @param {object} actionHelper - Helper object that abstracts UI actions (click, set text, etc.)
   */
  constructor(page, actionHelper) {
    this.page = page;                 // Playwright page instance to control browser
    this.actionHelper = actionHelper; // Helper for performing UI actions consistently
  }

  /**
   * Opens the Policy tab by clicking the tab button.
   * Uses actionHelper with CLICK action type and the policy tab locator.
   */
  async openPolicyTab() {
    await this.actionHelper.actionMethod(ActionTypes.CLICK, policyTabLocators.policyTabButton);
  }

  /**
   * Enters the given file number into the file input field on the Policy tab.
   * @param {string} fileNumber - The file number to input into the field
   */
  async enterFileNumber(fileNumber) {
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, policyTabLocators.fileInputField, fileNumber);
  }

  /**
   * Enters the given policy number into the policy input field on the Policy tab.
   * @param {string} policyNumber - The policy number to input into the field
   */
  async enterPolicyNumber(policyNumber) {
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, policyTabLocators.policyInputField, policyNumber);
  }

  /**
   * Clicks the Search button to submit the search criteria.
   */
  async clickSearch() {
    await this.actionHelper.actionMethod(ActionTypes.CLICK, policyTabLocators.searchButton);
  }

  /**
   * Opens the Policy dropdown menu.
   * Waits for the dropdown to be visible before clicking it.
   */
  async openPolicyDropdown() {
    await this.page.waitForSelector(policyTabLocators.policydropdown, { state: 'visible' });
    await this.actionHelper.actionMethod(ActionTypes.CLICK, policyTabLocators.policydropdown);
  }

  /**
   * Opens the Property dropdown menu.
   * Waits for the dropdown to be visible before clicking it.
   */
  async openPropertyDropdown() {
    await this.page.waitForSelector(policyTabLocators.propertydropdown, { state: 'visible' });
    await this.actionHelper.actionMethod(ActionTypes.CLICK, policyTabLocators.propertydropdown);
  }

  /**
   * Performs a policy search by entering file number and/or policy number and clicking Search.
   * Note: This method only performs search; dropdown expansions are handled externally.
   * @param {string} fileNumber - File number to enter (optional)
   * @param {string|null} policyNumber - Policy number to enter (optional, defaults to null)
   */
  async searchPolicy(fileNumber, policyNumber = null) {
    await this.openPolicyTab();               // Open the Policy tab first
    if (fileNumber) await this.enterFileNumber(fileNumber);  // Enter file number if provided
    if (policyNumber) await this.enterPolicyNumber(policyNumber); // Enter policy number if provided
    await this.clickSearch();                  // Click the search button
  }
}
