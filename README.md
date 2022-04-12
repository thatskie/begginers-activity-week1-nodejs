# begginers-activity-week1-nodejs
This project is to start your learning journey in Node JS. 

The following are the activities inside this project:  
1. Convert Excel File to JSON 
2. Convert JSON Data to Excel File 
3. Add a background image to a PNG File 
4. Generate QR Code and Barcode 
5. Retrieve Data from Movie List

**General Declarations**
<br>To create a color instance <code>npm install colors</code>
```
const colors = require('colors');
```
To create instance for File System. This will helps us store, access, and manage data on our operating system.
```
const fs = require('fs');
```
Declare general variables for input and output directory

```
var dirOutput =  "./files/output/";
var dirInput =  "./files/input/";
```

Generic functions for displaying console
```
function errorConsole(message) {
    return console.log(colors.white(message).bgRed);
}
function infoConsole(message) {
    return console.log(colors.black(message).bgBrightCyan);
}
function successConsole(message) {
    return console.log(colors.red(message).bgYellow);
}
```

<br><br>**I. Convert Excel File to JSON** <code> npm install simple-excel-to-json</code>
<br>To create simple-excel-to-json instance
```
const parser = new (require('simple-excel-to-json').XlsParser)();
```
**Use Case**
<br>Easily store data from an Excel file to JSON Format so that it can be usable by a wide variety of applications
<br><br>**Code**
```
    // this will create the JSON data
    const doc = parser.parseXls2Json(dirInput + 'excel-to-json.xlsx');
    // declare JSON data to a variable
    var jsonData = doc[0];
    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonData);
    // save JSON data to local file
    fs.writeFile(dirOutput + "excel-to-json.json", jsonContent, 'utf8', function (err) {
        if (err) {
            errorConsole("An error occured while writing JSON Object to File.");
            return errorConsole(err);
        }
    });
```

<br><br>**II. Convert JSON Data to Excel File** <code> npm i json2xls </code>
<br>To create json2xls instance
```
const json2xls = require('json2xls');
```
**Use Case**
<br>Easily store data from an Excel file to JSON Format so that it can be usable by a wide variety of applications
<br><br>**Code**
```
    // this will create the Excel file where jsonData (declared variable for the JSON Data we want to convert to Excel)
    var xls = json2xls(jsonData,{
        // this will declare what specific data we want to be added in the Excel File
        // "lname" - is the key of JSON Object
        // "caption" - will be the header of the Excel column for the given key data
        fields: {lname:{ caption: "Last Name", type:"string"}, fname:{ caption: "First Name", type:"string"}, email:{ caption: "Email Address", type:"string"}}
    });
    // save Excel to local file
    fs.writeFileSync(dirOutput + "json-to-excel.xlsx", xls, "binary");
```

<br><br>**III. Add a background image to a PNG File** <code> npm i images </code>
<br>To create images instance
```
const images = require('images');
```
**Use Case**
<br>Combine two images to create new image
<br><br>**Code**
```
    // this will merge two images
    images(bgPath)
        .size(800)
        .draw(images(pngPath).size(600), 100, 150)
        .save(dirOutput + 'pngWithBG.png', {
            quality: 50
        });
```

<br><br>**IV. Generate QR Code and Barcode** <code> npm i pure-svg-code </code>
<br>To create pure-svg-code instance
```
const {barcode,qrcode,svg2url} = require('pure-svg-code');
```
**Use Case**
<br>To create QR Code and Barcode that contains an identify a product or person and encode important details so that a machine/computer can easily read this data
<br><br>**Code**
```
// creating QRCode
const qrSVGString = qrcode({
    content: "www.google.com",
    padding: 4,
    width: 256,
    height: 256,
    color: "#000000",
    background: "#ffffff",
    ecl: "M"    
});
// save generated QRcode to local file
fs.writeFile(dirOutput + "qrCode.svg", qrSVGString, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;
});
// creating Barcode
var barSVGString = barcode("9234567890128", "ean13", {width:'50', barWidth:1, barHeight:50});
// save generated barcode to local file
fs.writeFile(dirOutput + "barCode.svg", barSVGString, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;
});
```
