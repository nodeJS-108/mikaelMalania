// const path = require('path');

// const filePath = path.join(['folder', 'subfolder', 'userData.txt'].join());

// console.log(filePath)

const { mkdir } = require('fs');
const { join } = require('path');
console.log(__dirname+"/test/project");
const projectFolder = join(__dirname, 'test', 'project');
console.log(projectFolder);
// const dirCreation = await mkdir(projectFolder, { recursive: true });

// console.log(dirCreation);
