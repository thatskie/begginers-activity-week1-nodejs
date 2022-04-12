const colors = require('colors');// Create an instance for color
const parser = new (require('simple-excel-to-json').XlsParser)();// Create an instance for XlsParser
const json2xls = require('json2xls');// Create an instance for json2xls
const images = require('images');// Create an instance for images
const {barcode,qrcode,svg2url} = require('pure-svg-code');// Create an instance for pure-svg-code
var movieLister = require("movie-list-node");// file system module to perform file operations
const fs = require('fs');// file system module to perform file operations

// declare location
var dirOutput =  "./files/output/";
var dirInput =  "./files/input/";
// path of excel file
const excelPath = dirInput + 'excel-to-json.xlsx';
// path of images
const bgPath = dirInput + 'bg.jpg';
const pngPath = dirInput + 'logo.png';
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

movieLister("batman");