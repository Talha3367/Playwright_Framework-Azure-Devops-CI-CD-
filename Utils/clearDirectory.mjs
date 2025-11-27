import fsExtra from 'fs-extra'
import path from 'path'

const emptyFolder = async (folderPath) => {
    try {
        const __dirname = path.resolve(path.dirname(''));
        let fPath=path.join(path.join(__dirname, './src'),folderPath)
        await fsExtra.emptyDir(fPath);
        console.log(fPath+' ==> Cleared!');
    } catch (err){
        console.log(err);
    }
}

// Run the function
emptyFolder("../Screenshots");
emptyFolder("../Data/Download");