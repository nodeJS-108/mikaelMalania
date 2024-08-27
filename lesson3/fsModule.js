const fs = require('fs');

// let readData = fs.readFileSync('silabusi.txt')
// let readDData = fs.writeFileSync('modified_sylabus.txt', readData.toString())
// console.log(readDData)

let readData = fs.copyFile('./index_common_js.js', './index2_common_js.js' , (err) =>{
    console.log(err)
})

fs.readFile('./texts/userData.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error occured while reading the file", err);
        return;
    }
    console.log(data)
    data += ' Modified Data!'
    // since this is acsyn its only available in this part
    fs.writeFile('./texts/userData.txt', data, (err)=> {
        if (err) {
            console.log("Error reading to file")
            return;
        }


        console.log("data has been written to file")
    })
})

const fileData = fs.readFileSync('output.txt','utf8');

console.log('==============>>>>>>',fileData);