import fs from "fs/promises";
import path from 'path';
import PDFParser from 'pdf2json';

export class PdfFileHandler {

    static async readFile(fileName) {
        try {
            // Resolve the directory name
            const __dirname = path.resolve(path.dirname(''));
            let fPath=path.join(path.join(__dirname, './src'),"../Data/Download/"+fileName)
            // Read the PDF file
            const dataBuffer = await fs.readFile(fPath);

            // Parse the PDF file
            const pdfParser = new PDFParser();
            pdfParser.parseBuffer(dataBuffer);

            return new Promise((resolve, reject) => {
                pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
                pdfParser.on("pdfParser_dataReady", pdfData => resolve(pdfData));
            });
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    static async validateTextInPdf(fileName, searchText) {
        try {
            const pdfData = await this.readFile(fileName+".pdf");
            const decodedSearchText = decodeURIComponent(searchText);
            for (const page of pdfData.Pages) {
                for (const text of page.Texts) {
                    const decodedText = decodeURIComponent(text.R[0].T);
                    if (decodedText.includes(decodedSearchText)) {
                        return true;
                    }
                }
            }
            return false;
        } catch (error) {
            throw 'Error validating text in PDF: '+ error
        }
    }

    static async validateTextNotInPdf(fileName, searchText) {
        try {
            const pdfData = await this.readFile(fileName + ".pdf");
            const decodedSearchText = decodeURIComponent(searchText);
    
            for (const page of pdfData.Pages) {
                for (const text of page.Texts) {
                    const decodedText = decodeURIComponent(text.R[0].T);
                    if (decodedText.includes(decodedSearchText)) {
                        return false; // Text found, return false
                    }
                }
            }
            return true; // Text not found, return true
        } catch (error) {
            throw 'Error validating text in PDF: ' + error;
        }
    }
}