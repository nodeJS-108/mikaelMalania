const fs = require('fs');

// let silabusi = fs.readFileSync("silabusi.txt", 'utf-8');

// console.log(silabusi);

fs.readFile('silabusi.txt', 'utf-8', (err, data) => {
    console.log(data)
})

// const writeToFile = fs.writeFileSync('')

fs.writeFile('newFile.txt', 'abcd', (err) => {
    if (!err) {
        console.log('data has been added', err);
    } else {
        throw new Error('An error has occurred' + err);
    }
})

fs.appendFile('newFile.txt', 'efjk', 'utf-8', (err) => {
    if (!err) {
        console.log("Appended new data")
    }
});