/**
 * Locators used on the Login page for interacting with login elements.
 */
export const loginPageLocators = {

  usernameField: "//input[@type='email']",
  passwordField: "//input[@type='password']",
  signInButton: "//button[.//span[normalize-space()='sign in']]"

};


export const homePageLocators = {
  homePageLogo: "//img[@alt='Brand']",
  patternsButton: "//a[.//span[text()='Patterns']]",
  XAgentsButton: "//a[.//span[text()='X-Agents']]"

};


export const patternPageLocators = {
  patternTitle: "//p[contains(@class,'MuiTypography-body1')]",
};


export const XAgentsPageLocators = {
  paginationText: "//div[@style[contains(.,'display: flex') and contains(.,'justify-content: space-between')]]/div[1]",

};

