/**
 * Created by CSS on 15-06-2016.
 */
describe('dashboardService',function(){


    var $controller,$factory,windowObj;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("dashboardService");
    }));

    describe('Dashboard Service',function(){
        it('open logout screen',inject(function(){
            $factory.logout();
            expect(windowObj.location.href).toEqual('/logout');
        }));

        it('open profile page',inject(function(){
            localStorage.setItem('userType','user');
            $factory.profile();
            expect(windowObj.location.href).toEqual('/profile/userProfile');

            localStorage.setItem('userType','admin');

            $factory.profile();
            expect(windowObj.location.href).toEqual('/profile/adminProfile');

        }));

        it('open documentation screen',inject(function(){
            localStorage.setItem('userType','user');
            $factory.documentation();
            expect(windowObj.location.href).toEqual('/documents/documentSearch');

            localStorage.setItem('userType','admin');

            $factory.documentation();
            expect(windowObj.location.href).toEqual('/documents/singleFileUpload');
        }));

        it('open project screen',inject(function(){
            localStorage.setItem('userType','user');
            $factory.project();
            expect(windowObj.location.href).toEqual('/project/home');

            localStorage.setItem('userType','admin');

            $factory.project();
            expect(windowObj.location.href).toEqual('/project/projectReg');
        }));

        it('open forum screen',inject(function(){
            localStorage.setItem('userType','user');
            $factory.forum();
            expect(windowObj.location.href).toEqual('/forum/home');

            localStorage.setItem('userType','admin');

            $factory.forum();
        }));

        it('open dashboard screen',inject(function(){
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        }));

        it('Check Admin',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getLoggedInUser')
                .respond(200, {config: {data: {userType:'admin'}}});
            var res=$factory.checkAdmin();
            expect($httpBackend.flush).not.toThrow();

            $httpBackend
                .when('GET','/getLoggedInUser')
                .respond(200, {config: {data: {}}});
            var res=$factory.checkAdmin();
            expect($httpBackend.flush).not.toThrow();

        }));

    });

});