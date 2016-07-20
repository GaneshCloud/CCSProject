describe('unRegister service',function() {

    var $controller, $factory, windowObj;


    beforeEach(module('myApp'));
    // module(function($provide){
    //     //$provide.value('$window',$window);
    // });
    beforeEach(module(function ($provide) {
        windowObj = {location: {href: ''}};
        $provide.value('$window', windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("unRegisterService");
    }));

    describe('get the waterMarked synopsis',function(){
        it('get project pdf files',inject(function($httpBackend){
            $httpBackend
                .when('GET','/fileDoc')
                .respond(200);
            var res=$factory.getFileDoc();
            expect($httpBackend.flush).not.toThrow();
        }));

        it('get project pdf files',inject(function($httpBackend){
            $httpBackend
                .when('GET','/fileDoc1')
                .respond(200);
            var res=$factory.getFileDoc();
            expect($httpBackend.flush).toThrow();
        }));

    });

    describe("dashboard service",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        });
    });

});
