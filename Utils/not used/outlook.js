import ActionsHelper from "../../Actions/actionHelper";
import { sharePointFormElements, sharePointUserData } from "../../config";
import { outlookLocators } from "../pom/pageObjects/HomePageObjects";
import { ActionTypes } from "../actions";

export default new class Outlook {
   async openEmail(page,emailAddress){
    const actionHelper = new ActionsHelper(page);
    await page.goto("https://www.microsoft.com/en-us/microsoft-365/outlook");
    await page.waitForLoadState('load');
    await page.waitForTimeout(5*1000);
    await actionHelper.actionMethod(ActionTypes.CLICK, outlookLocators.signInButton);
    await actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.outLookUserEmail, emailAddress);
    await actionHelper.actionMethod(ActionTypes.CLICK, outlookLocators.emailNextButton);
    await actionHelper.actionMethod(ActionTypes.CLICK, sharePointFormElements.emailNextButton);
   }
   
   async searchEmail(page,subject){
        const actionHelper = new ActionsHelper(page);
        await page.waitForLoadState('load');
        await page.waitForTimeout(5*1000);
        await actionHelper.actionMethod(ActionTypes.SETTEXT, outlookLocators.searchInput, subject);
        await page.keyboard.press('Enter');
        await actionHelper.actionMethod(ActionTypes.CLICK, outlookLocators.searchButton);
        const xpath = "//span[text()='"+subject+"']/parent::span/parent::div"
        await actionHelper.actionMethod(ActionTypes.CLICK, xpath);
        await page.waitForTimeout(10*1000);

   }
}