import WebActions from '../Utils/WebActions.js';
import { AssertionType } from '../Utils/actions.js';

export default class VerifyActions {
    webAction;

    /**
     * Constructor initializes the VerifyActions with a Playwright page instance.
     * It also creates an instance of WebActions helper for UI interaction and verification.
     * @param {import('playwright').Page} page - Playwright page object to operate on.
     */
    constructor(page) {
        this.page = page;
        this.webAction = new WebActions(page);
    }

    /**
     * Centralized method to perform different UI assertions based on the assertion type.
     * This acts as a dispatcher calling appropriate verification methods from WebActions.
     * 
     * @param {string} locatorValue - The selector or locator string identifying the UI element.
     * @param {AssertionType} assertionType - The type of assertion to perform (e.g., text check, visibility).
     * @param {*} [expectedValue=null] - Optional expected value to compare against (text, attribute, count, etc.).
     * @param {Array} [frame=[]] - Optional array representing iframe hierarchy if element is inside frames.
     * 
     * @throws Will throw error if an invalid AssertionType is passed.
     */
    async verifyActions(locatorValue, assertionType, expectedValue = null, frame = []) {
        switch (assertionType) {
            // Check if element's text exactly equals expectedValue
            case AssertionType.EQUALCHECK:
                await this.webAction.verifyElementText(locatorValue, expectedValue, frame);
                break;

            // Check if element's text contains expectedValue substring
            case AssertionType.CONTAINTEXT:
                await this.webAction.verifyElementContainsText(locatorValue, expectedValue, frame);
                break;

            // Check if element is visible/displayed on the page
            case AssertionType.DISPLAYED:
                await this.webAction.verifyElementIsDisplayed(locatorValue, frame);
                break;

            // Check if element is enabled (interactive)
            case AssertionType.ENABLED:
                await this.webAction.verifyElementIsEnabled(locatorValue, frame);
                break;

            // Check if element is disabled (non-interactive)
            case AssertionType.DISABLED:
                await this.webAction.verifyElementIsDisabled(locatorValue, frame);
                break;

            // Check if table data exists within the element
            case AssertionType.TABLEDATAEXISTS:
                await this.webAction.verifyTableDataExists(locatorValue, frame);
                break;

            // Check a specific attribute/property of the element
            case AssertionType.PROPERTYCHECK:
                await this.webAction.verifyElementAttribute(locatorValue, frame);
                break;

            // Verify element is not displayed (hidden or removed)
            case AssertionType.NOTDISPLAYED:
                await this.webAction.verifyElementIsNotDisplayed(locatorValue, frame);
                break;

            // Verify a specific attribute does NOT exist on the element
            case AssertionType.ATTRIBUTENOTEXIST:
                await this.webAction.verifyElementAttributeNotExist(locatorValue, expectedValue, frame);
                break;

            // Verify the element does not exist in the DOM at all
            case AssertionType.NOTEXIST:
                await this.webAction.verifyElementNotExist(locatorValue, frame);
                break;

            // Verify element is hidden (via CSS or visibility)
            case AssertionType.ISHIDDEN:
                await this.webAction.verifyElementIsHidden(locatorValue, frame);
                break;

            // Verify the element has a specific CSS class
            case AssertionType.VERIFYHAVECLASS:
                await this.webAction.verifyHaveClass(locatorValue, expectedValue, frame);
                break;

            // Verify the element has a CSS class matching a pattern/regex
            case AssertionType.VERIFYHAVECLASSPATTERN:
                await this.webAction.verifyHaveClassPattern(locatorValue, expectedValue, frame);
                break;

            // Verify checkbox/radio element is checked
            case AssertionType.VERIFYELEMENTCHECKED:
                await this.webAction.verifyElementisChecked(locatorValue, frame);
                break;

            // Verify checkbox/radio element is NOT checked
            case AssertionType.VERIFYELEMENTNOTCHECKED:
                await this.webAction.verifyElementNotChecked(locatorValue, frame);
                break;

            // Verify element's text starts with expectedValue substring
            case AssertionType.TEXTSTARTSWITH:
                await this.webAction.verifyElementTextStartsWith(locatorValue, expectedValue, frame);
                break;

            // Verify element's text ends with expectedValue substring
            case AssertionType.TEXTENDSWITH:
                await this.webAction.verifyElementTextEndsWith(locatorValue, expectedValue, frame);
                break;

            // Verify placeholder attribute value matches expectedValue
            case AssertionType.PLACEHOLDERVALUE:
                await this.webAction.verifyPlaceholderValue(locatorValue, expectedValue, frame);
                break;

            // Verify specific CSS property value equals expected value
            case AssertionType.CSSVALUECHECK:
                await this.webAction.verifyCssValue(locatorValue, expectedValue.property, expectedValue.value, frame);
                break;

            // Verify the count of elements matching locator equals expectedValue
            case AssertionType.COUNTMATCH:
                await this.webAction.verifyElementCount(locatorValue, expectedValue, frame);
                break;

            // Handle unsupported or incorrect AssertionType input
            default:
                throw new Error("Wrong AssertionType Passed: " + assertionType);
        }
    }
}
