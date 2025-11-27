import path from 'path'
import ActionsHelper from '../../Actions/ActionHelper';
import { ActionTypes } from '../actions';
import fs from 'fs'

export default class Download{
    /**
     * @param {import("@playwright/test").Page} page - which will be used for page
     */
    static async handleDownload(page,elementLocator){
        const __dirname = path.resolve(path.dirname(''));
        let fPath=path.join(path.join(__dirname, './src'),"../Data/Download/")

        
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = page.waitForEvent('download');
        const actionHelper = new ActionsHelper(page);
        await actionHelper.actionMethod(ActionTypes.CLICK,elementLocator);
        const download = await downloadPromise;

        // Wait for the download process to complete and save the downloaded file somewhere.
        const downloadPath = fPath+ download.suggestedFilename();
        await download.saveAs(downloadPath);
        return downloadPath;
    }
    /**
     * @param {import("@playwright/test").Page} page - which will be used for page
     */
    static async handleAutoDownload(page,nameOfFile){
        await page.keyboard.down('Control');
        await page.keyboard.press('s');
        await page.keyboard.up('Control');
        await page.waitForTimeout(5000)
        const __dirname = path.resolve(path.dirname(''));
        let fPath=path.join(path.join(__dirname, './src'),"../Data/Download/")
        const downloadedPath = fPath+nameOfFile+".pdf";
        await page.emulateMedia({ media: 'screen' });
        await page.pdf({ path: downloadedPath});
        return downloadedPath;
    }

    static async handleRoute(page,api,elementLocator,nameOfFile){
        const downloadDir = path.join(__dirname, '../Data/Download');
        const pdfPath = path.join(downloadDir, `${nameOfFile}.pdf`);
        // Ensure the download directory exists
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
          const actionHelper = new ActionsHelper(page);
          
          const [response] = await Promise.all([
            page.waitForResponse(api),
            actionHelper.actionMethod(ActionTypes.CLICK,elementLocator), // Adjust the selector to match the link that opens the PDF
          ]);
        const responseBody = await response.json();
        const base64PDF = responseBody.PDF;

        // Convert base64 to binary and write to file
        const binaryPDF = Buffer.from(base64PDF, 'base64');
        fs.writeFileSync(pdfPath, binaryPDF);
        console.log(`PDF downloaded to: ${pdfPath}`);
          return pdfPath;
    }
}