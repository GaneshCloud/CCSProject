var edge = require('edge');
var path  = require('path');

module.exports = edge.func({
    source: './office.cs',
    references: [ 
        __dirname+'\\config\\pdfConvert\\Microsoft.Office.Interop.Word.dll',
        __dirname+'\\config\\pdfConvert\\Microsoft.Office.Interop.Excel.dll',
        __dirname+'\\config\\pdfConvert\\Microsoft.Office.Interop.PowerPoint.dll',
        __dirname+'\\config\\pdfConvert\\Office.dll',
        __dirname+'\\config\\pdfConvert\\Microsoft.Vbe.Interop.dll'
    ],
});