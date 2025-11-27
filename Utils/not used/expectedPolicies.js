// This object holds expected policy data used for validation tests.
// Each key is a unique identifier combining policy number, file number, and validation mode.
// The value is an object containing expected field values for that particular policy and mode.
// These expected values are used to compare against the UI data during validation.

/**
 * expectedPolicies:
 * - Keys: `${policyNumber}_${fileNumber}_${mode}` strings
 * - Values: Objects mapping field names to their expected values for validation
 *
 * Modes supported:
 * - 'default': Basic fields
 * - 'expanded': Additional fields shown when dropdown expanded
 * - 'all': All possible fields shown in full detail mode
 */
const expectedPolicies = {
  // Example entry for policy M-8912-000833061, file 4, default mode
  'M-8912-000833061_4_default': {
    fileNumber: "4",
    policyEffectiveDate: "03/25/2010",
    fullPolicyNumber: "M-8912-000833061",
    transactionType: "Lender Policy",
    policyAPN: "",                   // Empty string means no expected value
    assessorAPN: "144889 160.17-1-39",
    address: "4056 TOWERS PL, HAMBURG, NY 14075-1333",
    documentImageButton: true,       // Boolean indicates if button expected visible
    parcelDetailButton: true,
  },

  // Example entry for policy M-9402-667563, file 4, expanded mode
  'M-9402-667563_4_expanded': {
    policyEffectiveDate: "10/19/2016",
    fileNumber: "4",
    fullPolicyNumber: "M-9402-667563",
    transactionType: "Lender Policy",
    grantor: "",                    // Empty string means no expected value/display
    grantee: "HOLT, DOUGLAS L & HOLT, JACQUELINE G",
    insuredAmount: "$71,400",
    policySource: "Stewart Prior Files",
    insuredParty: "",
    exceptions: "N/A",
    policyAPN: "",
    assessorAPN: "100-00293-000",
    address: "775 JOHNSON LN, DELAWARE, AR 72835-9108",
    documentImageButton: false,     // Button expected NOT to be visible here
    parcelDetailButton: true,
  },

  // Example entry for policy M-9402-667563, file 4, all mode (full detail)
  'M-9402-667563_4_all': {
    fileNumber: "4",
    policyEffectiveDate: "10/19/2016",
    fullPolicyNumber: "M-9402-667563",
    transactionType: "Lender Policy",
    grantor: "",
    grantee: "HOLT, DOUGLAS L & HOLT, JACQUELINE G",
    insuredAmount: "$71,400",
    policySource: "Stewart Prior Files",
    insuredParty: "",
    exceptions: "N/A",
    policyAPN: "",
    assessorAPN: "100-00293-000",
    address: "775 JOHNSON LN, DELAWARE, AR 72835-9108",
    policySubdivision: "",
    assessmentSubdivision: "N/A",
    lot: "",
    block: "",
    bookVolume: "",
    page: "",
    section: "10",
    township: "7N",
    range: "22W",
    quarter1: "",
    quarter2: "",
    quarter3: "",
    fullLegalDescription: "",
    documentImageButton: false,
    parcelDetailButton: true,
  }
};

// Export the expectedPolicies object for use in validation modules
module.exports = { expectedPolicies };
