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
        $factory=$injector.get("viewDocumentServices");
    }));

    describe('get view documentService', function () {
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

    describe('get view documentService', function () {
        it('edit function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/edit?id=2')
                .respond(200);
            var res = $factory.edit(2);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('edit function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/api/docs/edidt?id=2')
                .respond(200);
            var res = $factory.edit();
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get view documentService', function () {
        it('download function', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/api/download')
                .respond(200);
            var res = $factory.Download(2);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('download function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('POST', '/api/downloads')
                .respond(200);
            var res = $factory.Download(3);
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get view documentService', function () {
        it('get Archive function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/readZip?id=20')
                .respond(200);
            var res = $factory.getArchieve(20);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get archive function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/readZiDp?id=20')
                .respond(200);
            var res = $factory.getArchieve(3);
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get view documentService', function () {
        it('get nextDocument function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/nextDoc?id=20')
                .respond(200);
            var res = $factory.getNextDoc(20);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get nextDocument function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/nextDocd?id=20')
                .respond(200);
            var res = $factory.getNextDoc(20);
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get view documentService', function () {
        it('get prevDocument function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/PrevDoc?id=20')
                .respond(200);
            var res = $factory.getPrevDoc(20);
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get prevDocument function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/PrevDoc3?id=20')
                .respond(200);
            var res = $factory.getPrevDoc(20);
            expect($httpBackend.flush).toThrow();

        }));
    });

    describe('get view documentService', function () {
        it('get userMode function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/mode')
                .respond(200);
            var res = $factory.getUser();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get userMode function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET', '/moded')
                .respond(200);
            var res = $factory.getUser();
            expect($httpBackend.flush).toThrow();

        }));
    });
    

});
