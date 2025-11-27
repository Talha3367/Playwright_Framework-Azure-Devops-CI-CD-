const { expect } = require("@playwright/test");
const path = require('path');

export default class WebActions {
    constructor(page) {
        this.page = page;  // Playwright page instance used for all actions
    }

    // =======================
    // Navigation & Waiting
    // =======================

    /** Navigate browser to a given URL */
    async navigateToURL(url) {
        await this.page.goto(url);
    }

    /** Wait for a frame to be attached and get its frameLocator */
    async waitForFrameAttached(locator) {
        return await this.page.frameLocator(locator);
    }

    /** Wait for a nested frame inside another frame */
    async waitForNestedFrameAttached(frame, locator) {
        return await frame.frameLocator(locator);
    }

    /** Wait for an element located by selector to appear in the DOM */
    async waitForElementAttached(locator) {
        const elementLocator = await this.page.locator(locator);
        await (await elementLocator.first()).waitFor({ timeout: 20 * 1000 }); // 20s timeout
        return elementLocator;
    }

    /** Return the locator for element without waiting */
    async waitForElementAttachedVerification(locator) {
        const elementLocator = await this.page.locator(locator);
        return elementLocator;
    }

    /** Wait for an element inside a frame */
    async waitForFrameElementAttached(frame, locator) {
        const frameElement = frame.locator(locator);
        await frameElement.first().waitFor({ timeout: 20 * 1000 });
        return frameElement;
    }

    /** Return element locator inside frame without waiting */
    async waitForFrameElementAttachedVerification(frame, locator) {
        const frameElement = frame.locator(locator);
        return frameElement;
    }

    /** Utility to introduce delay (ms) */
    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    // =======================
    // Element Locator Helpers
    // =======================

    /**
     * Handles element location considering possible frames.
     * If frames are specified, it traverses frames and waits for element inside last frame.
     * Otherwise, waits for element on main page.
     * @param {string} locator - Selector string
     * @param {Array} frame - Array of frame locators for nested frames
     * @returns {Locator} Playwright Locator for element
     */
    async elementLocatorFunction(locator, frame) {
        if (frame.length !== 0) {
            const frameElement = await this.multiFrameHandling(frame);
            return await this.waitForFrameElementAttached(frameElement, locator);
        }
        return await this.waitForElementAttached(locator);
    }


    // =======================
    // Element Interaction Actions
    // =======================

    /** Click element (handles frames if any) */
    async clickElement(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.click();
    }

    /** Click element using JavaScript (bypassing Playwright click) */
    async clickElementJS(locator, frame) {
        if (frame.length !== 0) {
            const frameElement = await this.multiFrameHandling(frame);
            await this.waitForFrameElementAttached(frameElement, locator);
            await frameElement.$eval(locator, el => el.click());
            return;
        }
        await this.waitForElementAttached(locator);
        await this.page.$eval(locator, el => el.click());
    }

    /** Double-click element */
    async doubleClickElement(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.dblclick();
    }

    /** Fill input or textarea element with text */
    async enterElementText(locator, text, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.fill(text);
    }

    /** Check a checkbox or radio input */
    async checkElement(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.check();
    }

    /** Uncheck a checkbox */
    async unCheckElement(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.uncheck();
    }

    /** Upload a file by setting input files */
    async uploadFile(locator, fileName, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        // Resolve path relative to this file, adjust if your structure changes
        const filePath = path.join(__dirname, "..\\Data\\" + fileName);
        await elementFound.setInputFiles(filePath);
    }

    /** Select an option by visible label from dropdown */
    async selectOptionFromDropdown(locator, option, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.selectOption({ label: option });
    }

    /** Select an option by value from dropdown */
    async selectOptionFromDropdownViaValue(locator, option, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.selectOption(option);
    }

    /** Hover mouse over element */
    async hoverOver(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.hover();
    }

    /** Set an attribute value on element (via JS evaluation) */
    async setAttribute(locator, attributeValue, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await elementFound.evaluate((el, value) => {
            el.value = value;  // Directly set element value attribute
        }, attributeValue);
    }

    /** Press a keyboard key on element */
    async keyPress(locator, key) {
        const elementFound = await this.waitForElementAttached(locator);
        await elementFound.press(key);
    }


    // =======================
    // Verification / Assertion Helpers
    // =======================

    /** Verify element's exact text matches expected */
    async verifyElementText(locator, text, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        const textValue = (await elementFound.textContent()) || (await elementFound.inputValue());
        expect(textValue.trim()).toBe(text);
    }

    /** Verify element contains expected text */
    async verifyElementContainsText(locator, text, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toContainText(text);
    }

    /** Verify element is checked */
    async verifyElementisChecked(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toBeChecked();
    }

    /** Verify element is not checked */
    async verifyElementNotChecked(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).not.toBeChecked();
    }

    /** Verify element has attribute with specified value */
    async verifyElementAttribute(locator, attribute, value, ...frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toHaveAttribute(attribute, value);
    }

    /** Verify element does NOT have specified attribute */
    async verifyElementAttributeNotExist(locator, attribute, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).not.toHaveAttribute(attribute);
    }

    /** Verify element does NOT exist in DOM */
    async verifyElementNotExist(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toHaveCount(0);
    }

    /** Verify element is visible on page */
    async verifyElementIsDisplayed(locator, frame) {
        if (frame.length !== 0) {
            const frameElement = await this.multiFrameHandling(frame);
            await frameElement.waitForSelector(locator, { state: 'visible', timeout: 20000 });
        } else {
            await this.page.waitForSelector(locator, { state: 'visible', timeout: 20000 });
        }
    }

    /** Verify element is NOT visible */
    async verifyElementIsNotDisplayed(locator, frame) {
        let elementFound;
        if (frame.length !== 0) {
            const frameElement = await this.multiFrameHandling(frame);
            elementFound = await this.waitForFrameElementAttachedVerification(frameElement, locator);
        } else {
            elementFound = await this.waitForElementAttachedVerification(locator);
        }
        await expect(elementFound).not.toBeVisible();
    }

    /** Assert that a boolean condition is true with a custom error message */
    async expectToBeTrue(status, errorMessage) {
        expect(status, `${errorMessage}`).toBe(true);
    }

    /** Assert equality between expected and actual values with error message */
    async expectToBeValue(expectedValue, actualValue, errorMessage) {
        expect(expectedValue.trim(), errorMessage).toBe(actualValue);
    }

    /** Verify element is enabled (not disabled) */
    async verifyElementIsEnabled(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toBeEnabled();
    }

    /** Verify element is disabled */
    async verifyElementIsDisabled(locator, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toBeDisabled();
    }

    /** Verify element is hidden (not visible and detached from DOM) */
    async verifyElementIsHidden(locator, frame) {
        let elementFound;
        if (frame.length !== 0) {
            const frameElement = await this.multiFrameHandling(frame);
            elementFound = await this.waitForFrameElementAttachedVerification(frameElement, locator);
        } else {
            elementFound = await this.waitForElementAttachedVerification(locator);
        }
        await expect(elementFound).toBeHidden({ timeout: 100 * 1000 }); // 100 seconds timeout
    }

    /** Verify element has an exact CSS class */
    async verifyHaveClass(locator, data, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toHaveClass(data);
    }

    /** Verify element's class matches a RegExp pattern */
    async verifyHaveClassPattern(locator, data, frame) {
        const elementFound = await this.elementLocatorFunction(locator, frame);
        await expect(elementFound).toHaveClass(new RegExp(data));
    }

    /** Verify table or collection has at least one matching element */
    async verifyTableDataExists(locator, frame) {
        const elementFounds = await this.elementLocatorFunction(locator, frame);
        expect(await elementFounds.count()).toBeGreaterThan(0);
    }


    // =======================
    // Frame Handling Utilities
    // =======================

    /**
     * Handles navigation through multiple nested frames.
     * Takes array of frame locators, iteratively finds each nested frame.
     * @param {Array<string>} frame - array of frame locators (strings)
     * @returns FrameLocator for innermost frame
     */
    async multiFrameHandling(frame) {
        let frameElement = await this.waitForFrameAttached(frame[0]);
        frame.shift();
        while (frame.length > 0) {
            frameElement = await this.waitForNestedFrameAttached(frameElement, frame[0]);
            frame.shift();
        }
        return frameElement;
    }


    // =======================
    // Miscellaneous Helpers
    // =======================

    /** Get trimmed text content of an element */
    async getTextContents(locator, frame) {
        try {
            const elementFound = await this.elementLocatorFunction(locator, frame);
            const text = await elementFound.textContent();
            return text.trim();
        } catch (error) {
            console.error("Error in getTextContents:", error);
            throw error;
        }
    }

    /** Get element locator, handling frames if specified */
    async getElement(locator, frame) {
        return await this.elementLocatorFunction(locator, frame);
    }

    /** Check if element exists and click it */
    async checkAndClickElement(selector) {
        const elementExists = await this.verifyElementExist(selector);
        if (elementExists) {
            await this.clickElement(selector, []);
        }
    }

    /** Verify element exists and is visible */
    async verifyElementExist(selector) {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            return false;
        }
    }
}
