/**
 * Created by Administrator on 6/8/2016.
 */

describe('single file upload Services', function () {
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
        $factory=$injector.get("uploadSingleServices");
    }));

    describe('#single fileupload  Service', function () {
        it('upload function', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/upload')
                .respond(200);
            var res = $factory.create();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('upload  function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/upload25')
                .respond(200);
            var res = $factory.create();
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('#single fileupload  Service', function () {
        it('edit function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/edit?id=2')
                .respond(200);
            var res = $factory.edit(2);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('edit function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/edit2?id=2')
                .respond(200);
            var res = $factory.edit(2);
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

    describe("multiple file upload",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            $factory.multipleFileUpload();
            expect(windowObj.location.href).toEqual('/documents/multipleFileUpload');
        });
    });

    describe("documentList function",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            $factory.documentList();
            expect(windowObj.location.href).toEqual('/documents/documentList');
        });
    });

    describe("logout documet",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            $factory.logout();
            expect(windowObj.location.href).toEqual('/logout');
        });
    });

    describe("logout docmnwet",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/adminDashboard');
        });
    });
});
