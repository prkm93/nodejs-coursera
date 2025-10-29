const http = require('http')
http.createServer((req, res) => {
    res.write('hello from server'); // writes response to client
    res.end() // end of response from server
    
}).listen(6000, () => {
    console.log('✅ Server running on http://localhost:6000');
})

// file system
const fs = require('fs')
fs.readFile('sample.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // Prints the content of sample.txt to console
    console.log(data)
})

//os
const os = require('os')
console.log('Computer OS platform', os.platform())
console.log('Computer OS architecture', os.arch())

// path
const path = require('path')
let result = path.basename('/content/index/home.html');
console.log(result); //outputs home.html to the console

// util
const util = require('util');
let str = 'The loop has executed %d time(s).';
for (let i = 1; i <= 10; i++) {
    console.log(util.format(str, i)); //outputs 'The loop has executed i time(s)'
}

// url
const url = require('url')
let webAddress = 'http://localhost:2000/index.html?lastName=Kent&firstName=Clark'

let qry = url.parse(webAddress, true)
let qryData = qry.query //returns an object: {lastName: 'Kent', firstName: 'Clark'}
console.log(qryData)


const qryStr = require('querystring');
let qryParams = qryStr.parse('lastName=Kent&firstName=Clark');
console.log(qryParams.firstName); //returns Clark