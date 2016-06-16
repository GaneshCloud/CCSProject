/**
 * Created by CSS on 15-06-2016.
 */
describe('changePasswordService',function(){


    var $controller,$factory,windowObj,Upload;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("changePasswordService");
    }));

    describe('Change Password Service',function(){
        it('open logout screen',inject(function(){
            $factory.logout();
            expect(windowObj.location.href).toEqual('/logout');
        }));

        it('open profile page',inject(function(){
            localStorage.setItem('userType','admin');
            $factory.profilePage();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        }));


        it('get Personal Data',inject(function($httpBackend){
            $httpBackend
                .when('GET','/connect/getPersonalData')
                .respond(200);
            var res=$factory.getPersonalData();
            expect($httpBackend.flush).not.toThrow();

        }));

        // it('get Personal Data error',inject(function($httpBackend){
        //     $httpBackend
        //         .when('GET','/connect/getPersonalData3')
        //         .respond(200);
        //     var res=$factory.getPersonalData();
        //     expect($httpBackend.flush).toThrow();
        //
        // }));


        it('Update Personal Data',inject(function($httpBackend){

            var personalData = {

            };
            $httpBackend
                .when('POST','/connect/updatePersonalData')
                .respond(200);
            var res=$factory.updatePersonalData(personalData);
            expect($httpBackend.flush).not.toThrow();

        }));

    });

});