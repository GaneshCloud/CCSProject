/**
 * Created by Administrator on 21.06.2016.
 */

(function() {
    angular
        .module('myApp')
        .factory('documentTypeServices', documentTypeServices);

    documentTypeServices.$inject=[];

    function documentTypeServices() {
        var type = [
            {id: 1, type: 'PDF Document', ptrn: '.pdf'},
            {id: 2, type: 'Word Document', ptrn: '.docx'},
            {id: 3, type: 'Slide Document', ptrn: '.ppt'},
            {id: 4, type: 'Image Document', ptrn: 'image/*'},
            {id: 5, type: 'Archive Document', ptrn: '*.zip|*.rar'},
            {id: 6, type: 'Video Document', ptrn: '.mp4'}               //Model for type of the document

        ];
        return {

            getDocumentType: function () {
                return type;

            }
        };
    }
})();