import path from 'path';
import fs from 'fs';

export default class Screenshot {

  /**
   * Takes a full-page screenshot with a formatted filename.
   * @param {import('playwright').Page} page - The Playwright page instance.
   * @param {string} title - The test title or description to include in the filename.
   * @param {string} actualStatus - The test status ('passed' or 'failed').
   * @param {string} EnvName - The environment name (e.g., 'QA', 'Prod') to include in the filename.
   */
  static async takeScreenshot(page, title, actualStatus, EnvName) {
    // Normalize status to 'Passed' or 'Failed' for the filename
    const status = actualStatus.toLowerCase() === 'passed' ? 'Passed' : 'Failed';

    // Replace invalid filename characters with underscores
    const safeTitle = title.replace(/[<>:"/\\|?*]+/g, '_');

    // Get current date/time for timestamp in filename
    const now = new Date();

    // Helper to pad numbers to 2 digits, e.g., 4 -> '04'
    const pad = (n) => n.toString().padStart(2, '0');

    // Format date as YYYY_MM_DD
    const datePart = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}`;

    // Format time as HH_MM_SS
    const timePart = `${pad(now.getHours())}_${pad(now.getMinutes())}_${pad(now.getSeconds())}`;

    // Combine date and time with a space
    const timestamp = `${datePart} ${timePart}`;

    // Build the final filename: sanitizedTitle_Status_EnvName_Timestamp.png
    const fileName = `${safeTitle}_${status}_${EnvName}_${timestamp}.png`;

    // Determine project root directory relative to this file (two levels up)
    const projectRoot = path.resolve(__dirname, '../../');

    // Path to the Screenshots directory inside the project root
    const screenshotsDir = path.resolve(projectRoot, 'Screenshots');

    // Create Screenshots directory if it does not exist
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Full path for the screenshot file
    const screenshotPath = path.resolve(screenshotsDir, fileName);

    console.log('Saving screenshot to:', screenshotPath);

    // Capture and save the full-page screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

}
