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
        $factory=$injector.get("uploadMultipleServices");
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

    describe('get search Service', function () {
        it('department function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET','/api/dep')
                .respond(200);
            var res = $factory.getDepartment();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('department function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET','/api/department')
                .respond(200);
            var res = $factory.getDepartment();
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe("single file upload",function () {
        it('href redirects', function() {
            $factory.singleFileUpload();
            expect(windowObj.location.href).toEqual('/documents/singleFileUpload');
        });
    });

    describe("single file upload",function () {
        it('href redirects', function() {
            $factory.singleFileUpload();
            expect(windowObj.location.href).toEqual('/documents/singleFileUpload');
        });
    });

    // describe("logout documet",function () {
    //     it('href redirects', function() {
    //         $factory.logout();
    //         expect(windowObj.location.href).toEqual('/logout');
    //     });
    // });

   describe("logout docmnwe t",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        });
    });
});
