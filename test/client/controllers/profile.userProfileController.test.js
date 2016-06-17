/**
 * Created by CSS on 15-06-2016.
 */

describe('#User Profile Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService,spinnerService,window;
    var filterFilter,userProfileService;
    var $q;
    var deferred;

    var spy,scope;

    var resultStatusElement;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_$window_,_userProfileService_,_dashboardService_,_spinnerService_,_filterFilter_,_$q_,$httpBackend) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        $q = _$q_;

        spinnerService = _spinnerService_;

        dashboardService = _dashboardService_;

        userProfileService = _userProfileService_;

        filterFilter = _filterFilter_;

        window = _$window_;

        deferred = $q.defer();

        $controller('userProfileController', {
            $scope: scope
        });

        element = angular.element('<spinner name="html5spinner" ng-cloak="">' +
            '<div class="overlay"></div>'+
            '<div class="spinner">'+
            '<div class="double-bounce1"></div>'+
            '<div class="double-bounce2"></div>'+
            '</div>'+
            '<div class="please-wait">Please Wait...</div>'+
            '</spinner>');

        $compile(element)(scope);
        $compile(angular.element('<div style="width: 300px; height: 10px;" id="result"></div>'))(scope);
        $compile(angular.element('<input type="file" ng-model="file" name="file" accept="image/*" ngf-max-size="20MB" id="fileInput" style="display:none" onchange=""/>'));
        //
        // $compile(element)(scope);

        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/connect/getPersonalData").respond("{'data':{'id':'1'}}");
        // $httpBackend.when("GET","/getLoggedInUser").respond("sample");

        // spyOn(adminProfileService, 'getUserDetails').and.returnValue(deferred.promise);
        spyOn(userProfileService, 'goToDashboard').and.returnValue();
        spyOn(userProfileService, 'addFacebookAccount').and.returnValue(deferred.promise);
        spyOn(userProfileService, 'addGoogleAccount').and.returnValue(deferred.promise);
        spyOn(userProfileService, 'uploadImage').and.returnValue(deferred.promise);
        spyOn(userProfileService, 'getPersonalData').and.returnValue(deferred.promise);
        spyOn(userProfileService, 'updatePersonalData').and.returnValue(deferred.promise);
        spyOn(dashboardService, 'logout').and.returnValue();
        spyOn(userProfileService, 'changePassword').and.returnValue();

    }));

    describe('#User Profile', function () {
        it('should open logout page', function () {

            scope.goToDashboard();
            expect(userProfileService.goToDashboard).toHaveBeenCalled();

        });

        it('should return current view', function () {

            localStorage.setItem('localView',true);
            var value = scope.getView('local');
            expect(value).toBeDefined();
            localStorage.setItem('facebookView',true);
            var fb_value = scope.getView('facebook');

            expect(fb_value).toBeDefined();
            localStorage.setItem('googleView',true);
            var google_value = scope.getView('google');

            expect(google_value).toBeDefined();

        });

        it('should change the view', function () {

            scope.viewChange('local');
            expect(localStorage.getItem('localView')).toEqual('true');
            expect(localStorage.getItem('googleView')).toEqual('false');
            expect(localStorage.getItem('facebookView')).toEqual('false');

            scope.viewChange('facebook');
            expect(localStorage.getItem('facebookView')).toEqual('true');
            expect(localStorage.getItem('googleView')).toEqual('false');
            expect(localStorage.getItem('localView')).toEqual('false');

            scope.viewChange('google');
            expect(localStorage.getItem('googleView')).toEqual('true');
            expect(localStorage.getItem('localView')).toEqual('false');
            expect(localStorage.getItem('facebookView')).toEqual('false');

        });

        it('should return value based on data changes', function () {
            scope.dataChanged = false;
            scope.dataChanges();
            expect(scope.dataChanged).toEqual(true);

        });
        it('should return facebook google and local image path', function () {
            scope.personalData.facebook_img = '';
            scope.showFacebookImage();
            expect(scope.file).toBeDefined();
            scope.personalData.google_img = '';
            scope.showGoogleImage();
            expect(scope.file).toBeDefined();
            scope.personalData.profile_pic = ''
            scope.showLocalImg();
            expect(scope.file).toBeDefined();

        });
        it('should add facebook account', function () {
            scope.addFacebookAccount();
            deferred.resolve({data:{id: 1,userType:'admin',facebook_img:''}});
               scope.$apply();


        });

        it('should add google account', function () {
            scope.addGoogleAccount();
            deferred.resolve({data:{id: 1,userType:'admin',facebook_img:''}});
            scope.$apply();


        });

        it('Should upload file ', function () {
            var image=[
                'hi',
                'hello'
            ]
            scope.uploadFile(image);
            expect(scope.file).toBeDefined();
            expect(scope.imageChanged).toEqual(true);

        });

        it('should upload file', function () {
            scope.fileUpload();
            deferred.resolve();

            scope.$apply();

        });

        it('should cancel File Upload', function () {
            scope.onCancelFileUpload();
            deferred.resolve();
            scope.$apply();

        });
        it('should return image path', function () {
            var path = scope.getImageSrc('hi');
            expect(path).toBeDefined();

            var path = scope.getImageSrc(undefined);
            expect(path).toBeDefined();

        });

        it('should true to edit personaldata', function () {
            scope.onEditPersonalData();

            expect(scope.editPersonalData).toEqual(true);

        });

        it('should trigger Upload', function () {
            scope.triggerUpload();


        });


        it('should submit personal data', function () {

            scope.personalData={

            }

            scope.onSubmitPersonalData();

            deferred.resolve();
            scope.$apply();


        });

        it('should cancel update personal data', function () {

            scope.onCancelPersonalData();

            deferred.promise.then(function () {

                expect(userProfileService.getPersonalData).toHaveBeenCalled();

            });

        });

        it('should logout', function () {

            scope.onLogout();

            expect(dashboardService.logout).toHaveBeenCalled();

        });
        it('change Password', function () {

            scope.personalData = {
                userType : 'user',
                password : 'nkj'
            };

            scope.onChangePassword();

            // expect(userProfileService.changePassword).toHaveBeenCalled();

            scope.personalData = {
                userType : 'user'
            };


            scope.onChangePassword();
        });
        it('should not change password', function () {

            scope.okOnCantChangePassword();

        });

        it('Should getPersonal DAta', function () {

            scope.getPersonalData();

            deferred.resolve({data:{id: 1,userType:'admin',facebook_img:''}});
            scope.$apply();

        });

        it('Email valid and invalid',function () {

            var data = {
                $valid : true
            }

            var value = scope.isEmailValid(data);

            expect(value).toEqual(true);

            data = {
                $invalid : true,
                $dirty:true
            }

            value = scope.isEmailInvalid(data);

            expect(value).toEqual(true);

            data = {
                $invalid : true,
                $dirty:true
            }

            value = scope.isContactInvalid(data);

            expect(value).toEqual(true);


        });

        // it('old password valid',function () {
        //
        //     var data = {
        //         $dirty:
        //     }
        //
        // });
    });

});