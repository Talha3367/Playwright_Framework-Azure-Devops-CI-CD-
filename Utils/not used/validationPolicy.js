import { expectedPolicies } from './expectedPolicies.js';
import { PolicyPage } from '../../pom/pageObjects.js';

// Define groups of fields to validate based on different modes of validation
const FIELD_GROUPS = {
  default: [
    'policyEffectiveDate',
    'fileNumber',
    'fullPolicyNumber',
    'transactionType',
    'policyAPN',
    'assessorAPN',
    'address',
    'documentImageButton',
    'parcelDetailButton',
  ],
  expanded: [
    'policyEffectiveDate',
    'fileNumber',
    'fullPolicyNumber',
    'transactionType',
    'grantor',
    'grantee',
    'insuredAmount',
    'policySource',
    'insuredParty',
    'exceptions',
    'policyAPN',
    'assessorAPN',
    'address',
    'documentImageButton',
    'parcelDetailButton',
  ],
  all: null, // 'all' mode will use all keys from expected data
};

/**
 * Generates a mapping of data-testid selectors for all policy-related fields
 * given a specific policyNumber.
 * This helps locate UI elements on the page for that policy.
 *
 * @param {string} policyNumber - The policy number to build locators for
 * @returns {object} - Object mapping field names to their XPath selectors
 */
function getPolicyLocators(policyNumber) {
  return {
    fullPolicyNumber: `//*[@data-testid='${policyNumber}_FullPolicyNumber']`,
    fileNumber: `//*[@data-testid='${policyNumber}_FileNumber']`,
    policyEffectiveDate: `//*[@data-testid='${policyNumber}_PolicyEffectiveDate']`,
    transactionType: `//*[@data-testid='${policyNumber}_TransactionType']`,
    grantor: `//*[@data-testid='${policyNumber}_Grantor']`,
    grantee: `//*[@data-testid='${policyNumber}_Grantee']`,
    insuredAmount: `//*[@data-testid='${policyNumber}_InsuredAmount']`,
    policySource: `//*[@data-testid='${policyNumber}_PolicySource']`,
    insuredParty: `//*[@data-testid='${policyNumber}_InsuredParty']`,
    exceptions: `//*[@data-testid='${policyNumber}_ExceptionText']`,
    policyAPN: `//*[@data-testid='${policyNumber}_APN']`,
    assessorAPN: `//*[@data-testid='${policyNumber}_AssessorAPN']`,
    address: `//*[@data-testid='${policyNumber}_Address']`,
    policySubdivision: `//*[@data-testid='${policyNumber}_PolicySubdivision']`,
    assessmentSubdivision: `//*[@data-testid='${policyNumber}_AssessmentSubdivision']`,
    lot: `//*[@data-testid='${policyNumber}_Lot']`,
    block: `//*[@data-testid='${policyNumber}_Block']`,
    bookVolume: `//*[@data-testid='${policyNumber}_BookVolume']`,
    page: `//*[@data-testid='${policyNumber}_Page']`,
    section: `//*[@data-testid='${policyNumber}_Section']`,
    township: `//*[@data-testid='${policyNumber}_Township']`,
    range: `//*[@data-testid='${policyNumber}_Range']`,
    quarter1: `//*[@data-testid='${policyNumber}_Quarter1']`,
    quarter2: `//*[@data-testid='${policyNumber}_Quarter2']`,
    quarter3: `//*[@data-testid='${policyNumber}_Quarter3']`,
    fullLegalDescription: `//*[@data-testid='${policyNumber}_FullLegalDescription']`,
    documentImageButton: `//*[@data-testid='${policyNumber}_DocumentImage']`,
    parcelDetailButton: `//*[@data-testid='${policyNumber}_ParcelDetail']`,
  };
}

/**
 * Main exported function to validate policy information on UI.
 * It performs a search on the page by policyNumber and/or fileNumber,
 * then verifies visible UI elements and their values against expected data.
 *
 * @param {object} params - Object of parameters
 * @param {import('playwright').Page} params.page - Playwright page object for UI interaction
 * @param {object} params.actionHelper - Helper object for actions (not detailed here)
 * @param {string} params.policyNumber - Policy number to search for (optional)
 * @param {string} params.fileNumber - File number to search for (optional)
 * @param {string} params.expectedPolicyNumber - Expected policy number for validation (required)
 * @param {string} params.expectedFileNumber - Expected file number for validation (required)
 * @param {'default'|'expanded'|'all'} [params.mode='default'] - Validation mode controlling which fields to check
 *
 * @throws Will throw error if expected data missing or validation fails
 */
export async function validatePolicyByPolicyAndFile({
  page,
  actionHelper,
  policyNumber = '',
  fileNumber = '',
  expectedPolicyNumber = '',
  expectedFileNumber = '',
  mode = 'default',
}) {
  // Ensure required expected values are provided for validation
  if (!expectedPolicyNumber || !expectedFileNumber) {
    throw new Error('Both expectedPolicyNumber and expectedFileNumber must be provided for validation');
  }

  // Create a key to look up expected data from imported expectedPolicies
  const key = `${expectedPolicyNumber}_${expectedFileNumber}_${mode}`;
  const expectedData = expectedPolicies[key];

  // Throw error if no expected data found for these keys
  if (!expectedData) {
    throw new Error(`No expected data found for policyNumber=${expectedPolicyNumber} and fileNumber=${expectedFileNumber}`);
  }

  // Instantiate PolicyPage object for performing UI interactions/search
  const policyPage = new PolicyPage(page, actionHelper);

  // Perform search on UI using provided policyNumber and/or fileNumber
  if (policyNumber && fileNumber) {
    await policyPage.searchPolicy(fileNumber, policyNumber);
  } else if (policyNumber) {
    await policyPage.searchPolicy('', policyNumber);
  } else if (fileNumber) {
    await policyPage.searchPolicy(fileNumber, null);
  } else {
    throw new Error('At least one of policyNumber or fileNumber must be provided for search');
  }

  // Pause briefly to allow page to load/settle after search
  await page.waitForTimeout(500);

  // Based on mode, open necessary dropdown UI elements to reveal additional fields
  if (mode === 'expanded') {
    await policyPage.openPolicyDropdown();
  } else if (mode === 'all') {
    await policyPage.openPolicyDropdown();
    await policyPage.openPropertyDropdown();
  }

  // Get the locators (selectors) for fields of this policy using expectedPolicyNumber
  const locators = getPolicyLocators(expectedPolicyNumber);

  // Determine which fields to check based on mode; 'all' means all keys in expectedData
  const fieldsToCheck =
    mode === 'all' ? Object.keys(expectedData) : FIELD_GROUPS[mode] || FIELD_GROUPS['default'];

  // Wait for the first field in fieldsToCheck to appear on the page to ensure page is ready
  const firstField = fieldsToCheck[0];
  const firstSelector = locators[firstField];
  await page.waitForSelector(firstSelector);

  // Collect all visible fields currently present on the page by checking each locator's visibility
  const visibleFields = [];
  for (const field of Object.keys(locators)) {
    try {
      const locator = page.locator(locators[field]);
      if (await locator.isVisible()) visibleFields.push(field);
    } catch {
      // Ignore errors if locator invalid or not found
    }
  }

  // Filter the fields that are mandatory to be visible:
  // Only include fields with non-empty expected values, except buttons which must be visible if expected true
  const mandatoryFields = fieldsToCheck.filter(field => {
    const val = expectedData[field];
    if (field === 'documentImageButton' || field === 'parcelDetailButton') {
      // Buttons are mandatory only if expected to be visible (true)
      return val === true;
    }
    return val !== undefined && val !== null && val !== '';
  });

  // Check for any mandatory fields that are missing (not visible)
  const missingFields = mandatoryFields.filter(f => !visibleFields.includes(f));

  // Also check for unexpected extra visible fields that should not be visible
  const extraFields = visibleFields.filter(f => !mandatoryFields.includes(f));

  // Throw error if there are missing mandatory fields or unexpected extra fields
  if (missingFields.length > 0 || extraFields.length > 0) {
    let errMsg = '';
    if (missingFields.length > 0) errMsg += `Missing expected fields on UI: ${missingFields.join(', ')}. `;
    if (extraFields.length > 0) errMsg += `Found unexpected extra fields on UI: ${extraFields.join(', ')}`;
    throw new Error(errMsg.trim());
  }

  // Proceed to validate the actual values of each field in fieldsToCheck
  for (const field of fieldsToCheck) {
    const selector = locators[field];
    const expectedValue = expectedData[field];
    if (!selector) continue; // Skip if no selector for this field

    const locator = page.locator(selector);

    // Special handling for buttons, where expectedValue is boolean for visibility
    if (field === 'documentImageButton' || field === 'parcelDetailButton') {
      const isVisible = await locator.isVisible().catch(() => false);
      if (expectedValue === true && !isVisible) {
        throw new Error(`Expected "${field}" to be visible, but it is NOT visible.`);
      }
      if (expectedValue === false && isVisible) {
        throw new Error(`Expected "${field}" to NOT be visible, but it is visible.`);
      }
      continue;
    }

    // For other fields, validate only if expectedValue is non-empty
    if (expectedValue !== undefined && expectedValue !== null && expectedValue !== '') {
      const isVisible = await locator.isVisible().catch(() => false);
      if (!isVisible) {
        throw new Error(`Element for "${field}" with selector "${selector}" not found or not visible`);
      }

      // Get the text content and compare to expected value (trimmed)
      const actualValue = (await locator.innerText()).trim();
      if (actualValue !== expectedValue) {
        throw new Error(`Validation failed for "${field}". Expected: "${expectedValue}", but got: "${actualValue}"`);
      }
    }
  }
}
