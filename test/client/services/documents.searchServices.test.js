/**
 * Created by Administrator on 6/8/2016.
 */

describe('Search Services', function () {

    var $controller,$factory,provide;
    beforeEach(module('myApp'));
    module(function($provide) {
        $provide.value('$window', $window);
    });

    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("documentSearchServices");
    }));

    describe('get search Service', function () {
        it('get function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs')
                .respond(200);
            var res = $factory.get();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs22')
                .respond(200);
            var res = $factory.get();
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('search Service', function () {
        it('search function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/search?dep=1')
                .respond(200);
            var res = $factory.search("?dep=1");
            expect($httpBackend.flush).not.toThrow();

        }));

        it('search function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/searching')
                .respond(200);
            var res = $factory.search();
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
