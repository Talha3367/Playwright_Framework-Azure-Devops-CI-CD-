/** @implements {import('@playwright/test/reporter').Reporter} */
import TearDown from '../TearDown.js';
import WebActions from './WebActions.js';
import { AppConfig, sharePointUserData } from '../config.js';

export const sharePointData = {
  sendReportToSharePoint: true,
  sendReportToTeams: false,
  durationInMS: -1,
  getHumanReadableDuration: "",
  totalTest: 0,
  passedTest: 0,
  failedTests: 0,
  skippedTests: 0,

};

export default class MyReporter {
  constructor(page) {
    this.page = page;
    this.tearDown = new TearDown();
    this.WebAction = new WebActions(page);
    this.initialize();
  }
  initialize() {
  }

  onBegin(config, suite) {
    this.startedAt = Date.now();
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    sharePointData.totalTest = suite.allTests().length;
  }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
    if (`${result.status}` == 'failed' || `${result.status}` == 'timedOut') {
      sharePointData.failedTests++;
      const redColor = '\x1b[31m';
      console.log(`${redColor} Test failed: ${result.error.message}`)

    }
    else {
      sharePointData.passedTest++;
    }
  }

  async onEnd(result) {
    sharePointData.durationInMS = Date.now() - this.startedAt;
    sharePointData.getHumanReadableDuration = await this.WebAction.millisecondsToHMS(sharePointData.durationInMS);
    console.log(`Finished the run: ${result.status}`);

    if (sharePointData.sendReportToTeams) {
      if (`${result.status}` == 'passed') {
        const teamsMessage = `**Playwright Operation: Tests Completed (All Succeeded)**` + await this.createMessageForTeams();
        await this.tearDown.sendTeamsMessage(sharePointUserData.teamChannelWebhookUrl, teamsMessage);
      }
      else {
        const teamsMessage = `**Playwright Operation: Tests Completed (With Failures)**` + await this.createMessageForTeams();
        await this.tearDown.sendTeamsMessage(sharePointUserData.teamChannelWebhookUrl, teamsMessage);
      }
    }
    if (sharePointData.sendReportToSharePoint) {
      await this.tearDown.sendReportToSharePointServer();
    }

  }

  async createMessageForTeams() {
    let sb = ""
    sb += ("<br>");
    sb += (`**ProjectName:** ${sharePointUserData.projectName}; **Enviornment:** ${AppConfig.EnvName}`);
    sb += ("<br>");
    sb += (`**SuiteName:** ${sharePointUserData.suiteName}`);
    sb += ("<br>");
    sb += (`**Counts: Total:** ${sharePointData.totalTest}; **Passed:** ${sharePointData.passedTest}; **Skipped:** ${sharePointData.skippedTests}; **Failed:** ${sharePointData.failedTests}`);
    sb += ("<br>");
    sb += (`**Time:** ${sharePointData.getHumanReadableDuration}`);
    sb += ("<br>");

    return sb;

  }
}
