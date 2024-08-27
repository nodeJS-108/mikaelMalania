const fs = require('fs');

const readableStream = fs.createReadStream('34mb.json', {highWaterMark: 1048576 });

let data = '';
let count = 0;
readableStream.on('data', (chunk)=> {
    console.log('received file chunk', chunk.length, 'bytes')
    data += chunk;
    count++;
})

readableStream.on('end', () => {
    console.log('data read has been finished');  
    // console.log(data);
});

readableStream.on('error', (err) => {
    throw new Error('An error occured during file open', err);
})