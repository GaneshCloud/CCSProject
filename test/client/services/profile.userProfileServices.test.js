/**
 * Created by CSS on 15-06-2016.
 */
describe('userProfileService',function(){


    var $controller,$factory,windowObj,Upload;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("userProfileService");
        Upload = $injector.get('Upload');
    }));

    describe('User Profile Service',function(){
        it('open change password screen',inject(function(){
            $factory.changePassword();
            expect(windowObj.location.href).toEqual('/profile/changePassword');
        }));

        it('open dashboard page',inject(function(){
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        }));

        it('Add facebook account',inject(function(){
            $factory.addFacebookAccount();
            expect(windowObj.location.href).toEqual('/auth/facebook');
        }));

        it('add google account',inject(function(){
            $factory.addGoogleAccount();
            expect(windowObj.location.href).toEqual('/auth/google');
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

        it('Upload Image',inject(function($httpBackend){
            var mockFile = {file:[{"name":"file.bin", "size":1018}]};
            $httpBackend.when('POST', '/connect/uploadImage').respond(200, {config: {data: {file:{name: 'a name'}}}, data: {}});

            // Upload.upload('/connect/uploadImage');

            var res = $factory.uploadImage(mockFile);

            $httpBackend.flush();

        }));

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