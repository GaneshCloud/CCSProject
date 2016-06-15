/**
 * Created by CSS on 15-06-2016.
 */
describe('loginService',function(){


    var $controller,$factory,windowObj;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("loginService");
    }));

    describe('Login Service',function(){
        it('Login With facebook',inject(function(){
            $factory.loginWithFacebook();
            expect(windowObj.location.href).toEqual('/auth/facebook');
        }));

        it('Login with google',inject(function(){
            $factory.loginWithGoogle();
            expect(windowObj.location.href).toEqual('/auth/google');
        }));

        it('Open dashboard',inject(function(){
            $factory.dashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        }));

        it('Verify a user',inject(function($httpBackend){
            $httpBackend
                .when('POST','/auth/verifyUser')
                .respond(200);
            var res=$factory.verifyUser('CBE001','Janani@1');
            expect($httpBackend.flush).not.toThrow();

        }));

        // it('Verify a user',inject(function($httpBackend){
        //     $httpBackend
        //         .when('GET','/auth/verifyUser1')
        //         .respond(200);
        //     var res=$factory.verifyUser('CBE001','Janani@1');
        //     expect($httpBackend.flush).toThrow();
        //
        // }));

        it('Check User',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getLoggedInUser')
                .respond(200, {config: {data: {userType:'admin'}}});
            var res=$factory.checkUser();
            expect($httpBackend.flush).not.toThrow();

        }));
    });

});