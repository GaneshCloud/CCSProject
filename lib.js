var edge = require('edge');
var path  = require('path');

module.exports = edge.func({
    source: './office.cs',
    references: [ 
        'C:\\Program Files\\Microsoft Visual Studio 11.0\\Visual Studio Tools for Office\\PIA\\Office14\\Microsoft.Office.Interop.Word.dll',
        'C:\\Program Files\\Microsoft Visual Studio 11.0\\Visual Studio Tools for Office\\PIA\\Office14\\Microsoft.Office.Interop.Excel.dll',
        'C:\\Program Files\\Microsoft Visual Studio 11.0\\Visual Studio Tools for Office\\PIA\\Office14\\Microsoft.Office.Interop.PowerPoint.dll',
        'C:\\Program Files\\Microsoft Visual Studio 11.0\\Visual Studio Tools for Office\\PIA\\Office14\\Office.dll',
        'C:\\Program Files\\Microsoft Visual Studio 11.0\\Visual Studio Tools for Office\\PIA\\Office14\\Microsoft.Vbe.Interop.dll'
    ],
});