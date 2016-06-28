/**
 * Created by CSS on 14-06-2016.
 */
/**
 * Created by CSS on 13-06-2016.
 */

describe('#Change Password Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService,spinnerService,$window;
    var changePasswordService;
    var $q,deferred,scope,element;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_$window_,_changePasswordService_,_dashboardService_,_spinnerService_,_$q_,$httpBackend) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        spinnerService = _spinnerService_;

        dashboardService = _dashboardService_;

        changePasswordService = _changePasswordService_;

        $window = _$window_;

        $q = _$q_;

        deferred = $q.defer();

        $window = jasmine.createSpyObj('$window', ['confirm']);

        $controller('changePasswordController', {
            $scope: scope,
            $window:$window
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

        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/connect/getPersonalData").respond({id: 1});
        spyOn(changePasswordService, 'updatePersonalData').and.returnValue(deferred.promise);
        spyOn(changePasswordService, 'getPersonalData').and.returnValue(deferred.promise);
        spyOn(changePasswordService, 'profilePage').and.returnValue(deferred.promise);

        spyOn(dashboardService, 'showError').and.returnValue();
    }));

    describe('#Change Password', function () {
        it('Update Password', function () {

            var data = {
                $viewValue : 'hi',
                password:''
            }

            scope.personalData = {
                password:''
            }

            $window.confirm.and.returnValue(true);

            scope.updatePassword(data);

            deferred.resolve();
            scope.$apply();

            $window.confirm.and.returnValue(false);
            scope.updatePassword(data);

            deferred.resolve();
            scope.$apply();
        });

        it('Update Password with error', function () {

            var data = {
                $viewValue : 'hi',
                password:''
            }

            scope.personalData = {
                password:''
            }

            $window.confirm.and.returnValue(true);

            scope.updatePassword(data);

            deferred.reject({data:{error:{code:''}}});
            scope.$apply();
            expect(dashboardService.showError).toHaveBeenCalled();

        });


        it('get Personal DAta', function () {

            scope.getPersonalData();

            deferred.resolve({data:{id: 1,userType:'admin',facebook_img:''}});
            scope.$apply();
        });

        it('get Personal DAta with error', function () {

            scope.getPersonalData();

            deferred.reject({data:{error:{code:''}}});
            scope.$apply();
            expect(dashboardService.showError).toHaveBeenCalled();
        });

        it('Cancel Change Password', function () {

            $window.confirm.and.returnValue(true);

            scope.onCancelChangePassword();

            deferred.promise.then(function () {
                expect(changePasswordService.profilePage).toHaveBeenCalled();

            });

        });

    });

    describe('#validation', function () {

        it('Old password Validation',function () {

            var data = {
                $dirty:true,
                $viewValue:'hi'
            };

            scope.personalData={
                password:'hi'
            }

            var value = scope.isOldPasswordValid(data);

            expect(value).toEqual(false);

            data = {
                $dirty:true,
                $viewValue:'hi'
            };

            scope.personalData={
                password:'hello'
            }

            var value = scope.isOldPasswordValid(data);

            expect(value).toEqual(true);


        });

        it('Reenter password Validation',function () {

            var data = {
                $viewValue:'hi'
            };
            var data1 = {
                $dirty:true,
                $viewValue:'hi'
            };

            var value = scope.isRePasswordValid(data,data1);

            expect(value).toEqual(false);

            data = {
                $viewValue:'hi'
            };
            data1 = {
                $dirty:true,
                $viewValue:'hello'
            };

            var value = scope.isRePasswordValid(data,data1);

            expect(value).toEqual(true);

        });

        it('Password validator',function () {

            var data = {
                $valid : true,
            }

            var value = scope.isPasswordValid(data);

            expect(value).toEqual(true);

        });

        it('Password Invalidator',function () {

            var data = {
                $dirty:true,
                $invalid : true,
            }

            var value = scope.isPasswordInvalid(data);

            expect(value).toEqual(true);

        });

        it('Show updated alert', function () {

            scope.showUpdatedStatus = true;

            var value = scope.showUpdatedAlert();

            expect(value).toEqual(true);

        });

        it('close alert', function () {

            scope.closeAlert();

            expect(scope.showUpdatedStatus).toEqual(false);

        });


    });
    
});