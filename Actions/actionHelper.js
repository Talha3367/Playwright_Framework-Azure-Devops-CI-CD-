import { ActionTypes } from '../Utils/actions.js';
import WebActions from '../Utils/WebActions.js';

export default class ActionsHelper {
    webAction;

    /**
     * Initialize ActionsHelper with Playwright page and instantiate WebActions.
     * @param {import('playwright').Page} page - Playwright page instance.
     */
    constructor(page) {
        this.page = page;
        this.webAction = new WebActions(page);
    }

    /**
     * Central method to perform UI actions based on the specified actionType.
     * Acts as a dispatcher that delegates the action to the appropriate method in WebActions.
     * 
     * @param {ActionTypes} actionType - The action to perform (e.g., click, set text).
     * @param {string} locatorValue - The selector or locator string identifying the UI element.
     * @param {string} [dataToSet] - Optional data used for input fields, dropdown selections, file uploads, etc.
     * @param {...any} frame - Optional frames hierarchy if the element is inside one or more iframes.
     * 
     * @returns {Promise<any>} Returns data for actions that fetch values, like GETTEXT or RETURNELEMENT.
     * @throws Will throw error if an invalid ActionType is passed.
     */
    async actionMethod(actionType, locatorValue, dataToSet, ...frame) {
        switch (actionType) {
            // Click on the element located by locatorValue
            case ActionTypes.CLICK:
                await this.webAction.clickElement(locatorValue, frame);
                break;

            // Click on element using JavaScript (useful if normal click doesn't work)
            case ActionTypes.CLICKVIAJS:
                await this.webAction.clickElementJS(locatorValue, frame);
                break;

            // Double-click the element
            case ActionTypes.DOUBLECLICK:
                await this.webAction.doubleClickElement(locatorValue, frame);
                break;

            // Set text input in an input or textarea field
            case ActionTypes.SETTEXT:
                await this.webAction.enterElementText(locatorValue, dataToSet, frame);
                break;

            // Clear the text of an input or textarea field
            case ActionTypes.CLEARTEXT:
                await this.webAction.clearText(locatorValue, frame);
                break;

            // Check a checkbox or radio button
            case ActionTypes.CHECK:
                await this.webAction.checkElement(locatorValue, frame);
                break;

            // Uncheck a checkbox
            case ActionTypes.UNCHECK:
                await this.webAction.unCheckElement(locatorValue, frame);
                break;

            // Upload a file to a file input element
            case ActionTypes.UPLOADFILE:
                await this.webAction.uploadFile(locatorValue, dataToSet, frame);
                break;

            // Select an option in dropdown by visible text or label
            case ActionTypes.SETDROPDOWN:
                await this.webAction.selectOptionFromDropdown(locatorValue, dataToSet, frame);
                break;

            // Select an option in dropdown by value attribute
            case ActionTypes.SETDROPDOWNVIAValue:
                await this.webAction.selectOptionFromDropdownViaValue(locatorValue, dataToSet, frame);
                break;

            // Hover mouse over the element
            case ActionTypes.HOVER:
                await this.webAction.hoverOver(locatorValue, frame);
                break;

            // Set attribute on the element (e.g., for testing or manipulation)
            case ActionTypes.SETATTRIBUTE:
                await this.webAction.setAttribute(locatorValue, dataToSet);
                break;

            // Get text content of the element
            case ActionTypes.GETTEXT:
                return await this.webAction.getTextContents(locatorValue, frame);

            // Get and return the element handle (useful for further actions)
            case ActionTypes.RETURNELEMENT:
                return await this.webAction.getElement(locatorValue, frame);

            // Scroll the element into view
            case ActionTypes.SCROLLINTOVIEW:
                await this.webAction.scrollIntoView(locatorValue, frame);
                break;

            // Send a key press to the element (e.g., Enter, Tab)
            case ActionTypes.KEYPRESS:
                await this.webAction.pressKey(locatorValue, dataToSet, frame); // dataToSet is the key name like 'Enter'
                break;

            // Focus the element (e.g., put cursor in input)
            case ActionTypes.FOCUS:
                await this.webAction.focusElement(locatorValue, frame);
                break;

            // Wait for the element to appear/become available
            case ActionTypes.WAITELEMENT:
                await this.webAction.waitForElement(locatorValue, frame);
                break;

            // Handle invalid action types gracefully
            default:
                throw new Error("Wrong ActionType Passed: " + actionType);
        }
    }
}
