/**
 * Created by Administrator on 6/8/2016.
 */
/**
 * Created by Administrator on 6/1/2016.
 */
describe('Document List Services', function () {

    var $controller,$factory,provide;
    beforeEach(module('myApp'));
    module(function($provide) {
        $provide.value('$window', $window);
    });


    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("documentListServices");
    }));

    describe('get documentList Service', function () {
        it('delete function', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/api/docs/delete')
                .respond(200);
            var res = $factory.delete(5);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('delete function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/api/docs/delete2')
                .respond(200);
            var res = $factory.delete(5);
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get documentList Service', function () {
        it('edit function', inject(function ($httpBackend) {
            $httpBackend
                .when('GET', '/api/docs/edit?id=2')
                .respond(200);
            var res=$factory.edit(2);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('edit function invalid url', inject(function ($httpBackend) {
            $httpBackend
                .when('GET', '/api/docs/editing')
                .respond(200);
            var res=$factory.edit(2);
            expect($httpBackend.flush).toThrow();
        }));
    });


    describe('get documentList Service', function () {
        it('search function', inject(function ($httpBackend) {
            $httpBackend
                .when('GET', '/api/search?depId=1&type=2&ser=abc')
                .respond(200);
            var res=$factory.search("?depId=1&type=2&ser=abc");
            expect($httpBackend.flush).not.toThrow();

        }));

        it('search function invalid url', inject(function ($httpBackend) {
            $httpBackend
                .when('GET','/api/search')
                .respond(200);
            var res=$factory.search("?depId=1&type=2&ser=abc");
            expect($httpBackend.flush).toThrow();
        }));
    });

    describe('get documentList Service', function () {
        it('department function', inject(function ($httpBackend) {
            $httpBackend
                .when('GET', '/api/dep')
                .respond(200);
            var res=$factory.getDepartment();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('department function invalid url', inject(function ($httpBackend) {
            $httpBackend
                .when('GET', '/api/dep2')
                .respond(200);
            var res=$factory.getDepartment();
            expect($httpBackend.flush).toThrow();
        }));
    });

    describe("new docmnwet",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            // $factory.newDocument();
            // expect($window.location.href).toHaveBeenCalledWith('/documents/singleFileUpload');
        });
    });

    describe("logout docmnwet",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            // $factory.logout();
            // expect($window.location.href).toHaveBeenCalledWith('/logout');
        });
    });

    describe("logout docmnwet",function () {
        beforeEach(function() {
            $window = {location: { href: jasmine.createSpy()} };
        });
        it('href redirects', function() {
            // $factory.goToDashboard();
            // expect($window.location.href).toHaveBeenCalledWith('/profile/adminDashboard');
        });
    });

});
