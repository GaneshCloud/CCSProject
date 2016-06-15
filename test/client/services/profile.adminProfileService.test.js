/**
 * Created by CSS on 15-06-2016.
 */
describe('adminProfileService',function(){


    var $controller,$factory,windowObj;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("adminProfileService");
    }));

    describe('Admin Profile Service',function(){
        
        it('open dashboard page',inject(function(){
            $factory.goToAdminDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        }));

        it('get User Details',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getUserDetails')
                .respond(200);
            var res=$factory.getUserDetails();
            expect($httpBackend.flush).not.toThrow();

        }));

        // it('get User Details',inject(function($httpBackend){
        //     $httpBackend
        //         .when('GET','/getUserDetails5')
        //         .respond(200);
        //     var res=$factory.getUserDetails();
        //     expect($httpBackend.flush).toThrow();
        //
        // }));


    });

});