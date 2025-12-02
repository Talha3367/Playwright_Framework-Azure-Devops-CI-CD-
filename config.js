export const sharePointFormElements = {
    outLookUserEmail: "//input[@type='email']",
    emailNextButton: "//input[@type='submit']",
    formUserId: "(//input[@placeholder='Enter your answer'])[1]", //userId
    executionDate: "(//input[@placeholder='Enter your answer'])[2]", // Date
    projectName: "(//input[@placeholder='Enter your answer'])[3]", //Project
    totalTest: "(//input[@placeholder='Enter your answer'])[4]", // TotalTests
    passedTests:"(//input[@placeholder='Enter your answer'])[5]", // Passed Test
    failedTests:"(//input[@placeholder='Enter your answer'])[6]", ////Failed Test
    suiteName: "(//input[@placeholder='Enter your answer'])[7]", ////SuiteName
    skippedTests: "(//input[@placeholder='Enter your answer'])[8]", ////skipped Test
    executionTime: "(//input[@placeholder='Enter your answer'])[9]", ////ExecutionTime
    envName:"(//input[@placeholder='Enter your answer'])[10]", ////EnvName Test
    passPercentage: "(//input[@placeholder='Enter your answer'])[11]", //Pass percentage ka kam
    submitButton:"//*[contains(text(),'Submit')]", ////submit Button
    // reportSuccess: "//span[contains(text(), 'Your response has been successfully recorded.')]",
    reportSuccess: "//span[contains(text(), 'Your response was submitted.')]",
  };
 
// export const sharePointUserData = {
//     teamChannelWebhookUrl:'https://stewarttitle.webhook.office.com/webhookb2/162a9a6c-5f8c-4d40-bec6-2ca6c0094649@160f867a-f41f-432c-b770-4a07803e4f5b/IncomingWebhook/81e427ae03b84d259ba78f566d7fda10/72f6ba64-f803-4363-b20b-4006292265ae/V2LksTLyQOM7RBVTpdOPVyxOqrkVpvVI3WXb5vaHiFcZA1',
//     sharePointFormURL: 'https://forms.office.com/Pages/ResponsePage.aspx?id=eoYPFh_0LEO3cEoHgD5PW8h6jh5KxNlBlf7H5GUlYV1URDNMQ0w4RlJGVk41WDEyNlBCRzVPUUxLRyQlQCN0PWcu',
//     outLookUserEmail: 'test_automation@stewart.com',
//     outLookUserPassword: 'mh6QP.9T)W^C*$Z)37=*3-r.S5tqw',
//     outLookUserName: 'test_automation',
//     projectName: "SPECTR",
//     suiteName: process.env.SUITE_NAME || "SPECTR_Smoke"
// };


export const AppConfig = {
  EnvName: process.env.EnvName || "qa",
  
  get BaseURL() {
    switch (this.EnvName.toLowerCase()) {
      case 'qa':
        return "example.com";
      case 'prod':
        return "example.com";
      default:
        return "";
    }
  },

  get UserName() {
    switch (this.EnvName.toLowerCase()) {
      case 'qa':
        return "username.com";
      case 'prod':
        return "";
      default:
        return "";
    }
  },

  get Password() {
    switch (this.EnvName.toLowerCase()) {
      case 'qa':
        return "userpassword";
      case 'prod':
        return "";
      default:
        return "";
    }
  },

};
