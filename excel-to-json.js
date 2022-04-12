const colors = require('colors');// Create an instance for color
const parser = new (require('simple-excel-to-json').XlsParser)();// Create an instance for XlsParser
const json2xls = require('json2xls');// Create an instance for json2xls
const images = require('images');// Create an instance for images
const {barcode,qrcode,svg2url} = require('pure-svg-code');// Create an instance for pure-svg-code
const getMovieList = require('movie-list-node');// file system module to perform file operations
const fs = require('fs');// file system module to perform file operations
// declare location
var dirOutput =  "./files/output/";
var dirInput =  "./files/input/";
// path of excel file
const excelPath = dirInput + 'excel-to-json.xlsx';
// path of images
const bgPath = dirInput + 'bg.jpg';
const pngPath = dirInput + 'logo.png';
const API_KEY = "01b0b94679a44fe7a5b9646f0056cba8";
// functions
function errorConsole(message) {
    return console.log(colors.white(message).bgRed);
}
function infoConsole(message) {
    return console.log(colors.black(message).bgBrightCyan);
}
function successConsole(message) {
    return console.log(colors.red(message).bgYellow);
}

if (fs.existsSync(excelPath)) {
    infoConsole("Excel file loaded!");
    // create document
    const doc = parser.parseXls2Json(dirInput + 'excel-to-json.xlsx');
    var jsonData = doc[0];
    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonData);
    //console.log(jsonContent);
    fs.writeFile(dirOutput + "excel-to-json.json", jsonContent, 'utf8', function (err) {
        if (err) {
            errorConsole("An error occured while writing JSON Object to File.");
            return errorConsole(err);
        }
        successConsole("JSON file has been saved.");
    });
    infoConsole("Starting to reupload JSON Data to Excel. Get only Last Name, First Name and Email columns");
    //var xls = json2xls(jsonData); // get all data from json file
    var xls = json2xls(jsonData,{
        fields: {lname:{ caption: "Last Name", type:"string"}, fname:{ caption: "First Name", type:"string"}, email:{ caption: "Email Address", type:"string"}}
    });
    fs.writeFileSync(dirOutput + "json-to-excel.xlsx", xls, "binary");
    successConsole("Excel file has been saved.");
} else {
    console.log(colors.white("Excel file not loaded").bgRed);
}
if (fs.existsSync(bgPath) && fs.existsSync(pngPath)) {
    infoConsole("Image file loaded!");
    infoConsole("Starting to add background to a PNG file");
    images(bgPath)
        .size(800)
        .draw(images(pngPath).size(600), 100, 150)
        .save(dirOutput + 'pngWithBG.png', {
            quality: 50
        });
    successConsole("Successfully created a background to PNG file");
} else {
    console.log(colors.white("Image file(s) not found!").bgRed);
}
infoConsole("Starting to create QR Code for www.google.com");
// var qrcode = new QRCode({
//     content: 'www.google.com',
//     padding: 4,
//     width: 256,
//     height: 256,
//     color: '#000000',
//     background: '#ffffff',
//     ecl: 'M'
//   }).save(dirOutput + "qrCode.svg", function (error) {
//     if (error) throw errorConsole(error);
//     successConsole("Successfully created a QRCode for www.google.com");
//   });

infoConsole("Starting to create QR Code for www.google.com");
const qrSVGString = qrcode({
    content: "www.google.com",
    padding: 4,
    width: 256,
    height: 256,
    color: "#000000",
    background: "#ffffff",
    ecl: "M"    
});
infoConsole("Saving QRCode to File");
fs.writeFile(dirOutput + "qrCode.svg", qrSVGString, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    successConsole("Successfully created a QRCode for www.google.com");
});
infoConsole("Starting to create Bar Code for 9234567890128");
var barSVGString = barcode("9234567890128", "ean13", {width:'50', barWidth:1, barHeight:50});
infoConsole("Saving QRCode to File");
fs.writeFile(dirOutput + "barCode.svg", barSVGString, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    successConsole("Successfully created a Bar Code for 9234567890128");
});


// (async () => {
//     console.log("Sample:" + await movieLister("bat"))
// })();

// var jsonData2 = movieLister("bat");

// const newSheet = await movieLister("bat");

//movieLister("bat").then(result => console.log(result));
//movieLister("bat");
//const movieList = getMovieList("bat");
//console.log(getMovieList("bat"));

// const pwd = await movieLister("bat");
// console.log(pwd);

//responseDataArr = getMovieList("bat");
var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        getMovieList("bat")
    }, 300);
  });
  
  promise.then((r) => {
    console.log(r)
  });

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(getMovieList("bat"));
//         console.log("2. It's resolved with a thenable; it's not yet settled");
//     }, 1000);
// });

// console.log(p);
//console.log(module.exports);
// console.log(jsonData2);
// let movieListData = movieLister("bat");
// console.log(movieListData);
// // stringify JSON Object
// var jsonContent2 = JSON.stringify(jsonData2);
// //console.log(jsonContent);
// fs.writeFile(dirOutput + "movie-list.json", module.exports, 'utf8', function (err) {
//     if (err) {
//         errorConsole("An error occured while writing JSON Object to File.");
//         return errorConsole(err);
//     }
//     successConsole("JSON file has been saved.");
// });


// var xls = json2xls(movieLister("bat")[0],{
//     fields: {id:{ caption: "ID", type:"string"}, original_title:{ caption: "original_title", type:"string"}, title:{ caption: "title", type:"string"}}
// });
// fs.writeFileSync(dirOutput + "movie-list.xlsx", xls, "binary");
