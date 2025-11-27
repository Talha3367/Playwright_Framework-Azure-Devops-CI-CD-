# Playwright Test Runner With JavaScript #
	##An example project demonstrating automation of playwright tests using POM (page object Model).##



# Commands #
> 1. npx playwright test   :to run test cases in headless mode (by default)
> 2. npx playwright test --headed    :to run test cases in headed mode 
> 3. npx playwright test --browser=chrome   :to run test cases in a particular browser 
> 4. npx playwright test —headed --browser=firefox   :to run test cases in a particular browser with headed mode 
> 5. npx playwright test /pathToTestCasesFile    :to run test cases of an particular file 
> 6. npx playwright test --reporter=html    :to run test cases with specific playwright report, run following command 
> 7. npx playwright test --grep '@runThroughTagName'   :to run test cases through tag name 
> 8. npx playwright test --grep-invert '@runThroughTagName'    :to you want to exclude test cases of an particular tag name run this command 
> 9. npx playwright test   if you have integrated allure report run test cases first  and then view reports through "allure serve"
> 10. npx playwright test --workers 1		:if you want to run test cases on custom number of workers
