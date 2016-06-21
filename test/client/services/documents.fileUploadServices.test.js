/**
 * Created by Administrator on 6/8/2016.
 */

describe('Search Services', function () {

    var $controller,$factory,provide,windowObj;

    beforeEach(module(function($provide) {
        windowObj = {location: {href: ''}};
        $provide.value('$window', windowObj);
    }));


    beforeEach(module('myApp'));
    module(function($provide) {
        $provide.value('$window', $window);
    });

    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("fileUploadServices");
    }));

    describe('get search Service', function () {
        it('save function', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/uploadMulti')
                .respond(200);
            var res = $factory.create();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('save function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/uploadMultiple')
                .respond(200);
            var res = $factory.create();
            expect($httpBackend.flush).toThrow();

        }));
    });
    


    describe('#single fileupload  Service', function () {
        it('edit function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/getDoc?id=2')
                .respond(200);
            var res = $factory.getDocument(2);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('edit function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/getDoc2?id=2')
                .respond(200);
            var res = $factory.getDocument(2);
            expect($httpBackend.flush).toThrow();

        }));
    });

    

   describe("logout docmnwe t",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        });
    });
});
