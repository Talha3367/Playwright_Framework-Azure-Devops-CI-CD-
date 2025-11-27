/**
 * Enum-like object defining all supported UI action types.
 * Used by ActionsHelper to determine what operation to perform.
 */
export const ActionTypes = {
  CLICK: 'click',                      // Perform a standard mouse click on an element
  CLICKVIAJS: "CLICKVIAJS",            // Click using JavaScript (bypasses normal click events)
  DOUBLECLICK: 'doubleclick',          // Double-click on an element
  SETTEXT: 'setText',                  // Set text input into a text field
  CLEARTEXT: 'clearText',              // Clear text from an input or textarea
  SETDROPDOWN: 'dropDown',             // Select option from dropdown by visible text/label
  SETDROPDOWNVIAValue: 'dropDownViaValue', // Select option from dropdown by value attribute
  UPLOADFILE: 'uploadFile',            // Upload a file via a file input element
  CHECK: 'check',                      // Check a checkbox or radio button
  UNCHECK: 'uncheck',                  // Uncheck a checkbox
  VERIFY: 'verify',                    // Perform a verification/assertion (used internally)
  FRAMECLICK: 'frameClick',            // Click inside an iframe (used with frame context)
  FRAMESET: 'frameSet',                // Set value inside an iframe element
  FRAMEVERIFY: 'frameVerify',          // Verify element inside an iframe
  HOVER: 'hover',                      // Hover mouse pointer over an element
  SETATTRIBUTE: 'setAttribute',        // Set an attribute on an element
  GETTEXT: 'gettext',                  // Retrieve text content from an element
  RETURNELEMENT: 'getElement',         // Get the element handle for further interaction
  SCROLLINTOVIEW: 'scrollIntoView',    // Scroll element into the viewport
  KEYPRESS: 'keyPress',                // Simulate key press event on an element
  FOCUS: 'focus',                      // Focus the element (put cursor inside input)
  WAITELEMENT: 'waitElement',          // Wait for the element to appear/become available
};

/**
 * Enum-like object defining assertion types for UI verifications.
 * Used by VerifyActions to specify the kind of assertion to execute.
 */
export const AssertionType = {
  EQUALCHECK: 'equalcheck',                 // Assert element text equals expected value
  DISPLAYED: 'displayed',                   // Assert element is visible/displayed on the page
  ENABLED: 'enabled',                       // Assert element is enabled/interactable
  DISABLED: 'disabled',                     // Assert element is disabled/unusable
  ISSELECTED: 'isselected',                 // Assert element (checkbox/radio) is selected
  TABLEDATAEXISTS: 'tableDataExists',       // Assert table data exists within a locator
  PROPERTYCHECK: 'propertyCheck',           // Assert element attribute/property has expected value
  NOTDISPLAYED: 'notDisplayed',             // Assert element is not visible/displayed
  ISHIDDEN: 'isHidden',                     // Assert element is hidden (CSS hidden or similar)
  VERIFYHAVECLASS: 'haveClass',             // Assert element has specific CSS class
  VERIFYHAVECLASSPATTERN: 'haveClassPattern', // Assert element's classes match a pattern/regex
  VERIFYELEMENTCHECKED: 'verifyElementChecked',   // Assert element (checkbox/radio) is checked
  VERIFYELEMENTNOTCHECKED: 'verifyElementNotChecked', // Assert element is not checked
  CONTAINTEXT: 'containText',               // Assert element text contains expected substring
  ATTRIBUTENOTEXIST: 'attributeNotExist',   // Assert element does not have a specific attribute
  NOTEXIST: 'notExist',                     // Assert element does not exist in DOM
  CHECKED: 'checked',                       // Alias: Assert element is checked (similar to VERIFYELEMENTCHECKED)
  TEXTSTARTSWITH: 'textStartsWith',         // Assert element text starts with expected string
  TEXTENDSWITH: 'textEndsWith',             // Assert element text ends with expected string
  PLACEHOLDERVALUE: 'placeholderValue',     // Assert placeholder attribute value matches expected
  CSSVALUECHECK: 'cssValueCheck',           // Assert CSS property value equals expected
  COUNTMATCH: 'countMatch'                  // Assert count of elements matching locator equals expected number
};
