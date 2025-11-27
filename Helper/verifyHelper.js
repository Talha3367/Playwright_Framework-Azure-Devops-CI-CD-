// Helper/verifyHelper.js
import { AssertionType } from '../Utils/actions.js';

/**
 * Pattern names list for verification
 */
export const patternNames = [
  "LLM",
  "Feature Extraction",
  "Document Generator",
  "Predictive Analysis",
  "Image to Text",
  "Text to Speech",
  "Recommendation System",
];

/**
 * Verify a single text is displayed
 * @param {import('playwright').Page} page
 * @param {import('../Actions/verifyActions.js').default} verification
 * @param {string} text
 */
export const verifyTextVisible = async (page, verification, text) => {
  await verification.verifyActions(`//p[normalize-space()='${text}']`, AssertionType.DISPLAYED);
};
