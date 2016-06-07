/**
 * Created by Administrator on 6/1/2016.
 */
describe('Icon Services', function () {

    var $controller,$factory;
    beforeEach(module('myApp'));



    beforeEach(inject(function($injector){
        $factory=$injector.get("iconServices");


    }));

    describe('get Icon Service', function () {
        it('checking pdf image', function () {

            var res=$factory.getIcon(1);
            expect(res).toEqual('images/documents/pdf.png');

        });

        it('checking doc image', function () {

            var res=$factory.getIcon(2);
            expect(res).toEqual('images/documents/word.png');

        });

        it('checking ppt image', function () {

            var res=$factory.getIcon(3);
            expect(res).toEqual('images/documents/text.png');

        });

        it('checking image image', function () {

            var res=$factory.getIcon(4);
            expect(res).toEqual('images/documents/image.PNG');

        });


        it('checking zip image', function () {

            var res=$factory.getIcon(5);
            expect(res).toEqual('images/documents/zip.png');

        });
        it('checking video image', function () {

            var res=$factory.getIcon(6);
            expect(res).toEqual('images/documents/video.png');

        });

        it('checking all image', function () {

            var res=$factory.getIcon(7);
            expect(res).toEqual('images/documents/all.png');

        });




    });



});