import fs from 'fs-extra'
import { expect } from '@playwright/test';
import path from 'path'
export default class FileHandler{
    static async verifyFileExists(fileName){
        const downloadDir = path.join(__dirname, '../Data/Download');
        const filePath = path.join(downloadDir, fileName);
        expect(fs.pathExists(filePath)).toBeTruthy;
        const stats = fs.statSync(filePath);
        return stats.size;
    }
}