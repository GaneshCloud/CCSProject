/**
 * Created by Administrator on 22.06.2016.
 */

describe('department Services', function () {

    var $controller,$factory;
    beforeEach(module('myApp'));
    beforeEach(inject(function($injector){
        $factory=$injector.get("documentTypeServices");
    }));

    describe('get documentType Service', function () {
        it('checking with all data', function () {

            var expectRes=[
                {id: 1, type: 'PDF Document', ptrn: '.pdf'},
                {id: 2, type: 'Word Document', ptrn: '.docx'},
                {id: 3, type: 'Slide Document', ptrn: '.ppt'},
                {id: 4, type: 'Image Document', ptrn: 'image/*'},
                {id: 5, type: 'Archive Document', ptrn: '*.zip|*.rar'},
                {id: 6, type: 'Video Document', ptrn: '.mp4'}               //Model for type of the document

            ];
            var res=$factory.getDocumentType();
            expect(res).toEqual(expectRes);

        });
    });



});