const WebActions =require('./Utils/WebActions.js');
import { chromium } from 'playwright';
const { expect } = require("@playwright/test");
import { sharePointFormElements, sharePointUserData, AppConfig } from './config.js';
import { ActionTypes, AssertionType } from './Utils/actions.js';
import ActionsHelper from './Actions/actionHelper.js';
import { sharePointData } from './Utils/yourReporter.js';
import axios from 'axios';

export default class TearDown {

  async sendReportToSharePointServer() {
    const browser = await chromium.launch({ headless: false, slowMo: 1000,args: ['--auth-server-allowlist="_"']});
    const context = await browser.newContext({
      httpCredentials: {username: `${sharePointUserData.outLookUserName}`, password: `${sharePointUserData.outLookUserPassword}`}
  });
    const page = await context.newPage();
    this.WebAction = new WebActions(page);
    this.actionHelper = new ActionsHelper(page);
    if (!sharePointData) {
      console.error('sharePointData is undefined or not properly initialized.');
    } else {
      let totalTestsExecuted = sharePointData.totalTest;
      console.log(totalTestsExecuted);
    }
    this.WebAction.navigateToURL(sharePointUserData.sharePointFormURL);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.outLookUserEmail, sharePointUserData.outLookUserEmail ,null, null);

    await this.actionHelper.actionMethod(ActionTypes.CLICK, sharePointFormElements.emailNextButton, null, null, null);
    await page.waitForTimeout(10000);

    const randomUserId = Math.floor(Math.random() * 9000).toString();
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.formUserId, randomUserId, null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.executionDate, await this.WebAction.getCurrentDate(), null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.projectName, sharePointUserData.projectName, null, null);
    const totalTestsExecuted =  sharePointData.totalTest;
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.totalTest, totalTestsExecuted.toString() , null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.passedTests, sharePointData.passedTest.toString(), null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.failedTests, sharePointData.failedTests.toString(), null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.suiteName, sharePointUserData.suiteName, null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.skippedTests, sharePointData.skippedTests.toString(), null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.executionTime, sharePointData.getHumanReadableDuration, null, null);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.envName, AppConfig.EnvName, null, null);
    const passedPercentage = parseFloat(sharePointData.passedTest / (sharePointData.passedTest + sharePointData.failedTests) * 100);
    await this.actionHelper.actionMethod(ActionTypes.SETTEXT, sharePointFormElements.passPercentage, passedPercentage.toString(), null, null);
    await this.actionHelper.actionMethod(ActionTypes.CLICK, sharePointFormElements.submitButton, null, null, null);
    await this.actionHelper.actionMethod(ActionTypes.VERIFY, sharePointFormElements.reportSuccess, null, AssertionType.DISPLAYED, null);
  }

  async sendTeamsMessage(webhookUrl, message) {
    try {
      await axios.post(webhookUrl, {
        text: message,
      });
      console.log('Message sent successfully to Microsoft Teams!');
    } catch (error) {
      console.error('Error sending message to Microsoft Teams:', error.message);
    }
  }
}

