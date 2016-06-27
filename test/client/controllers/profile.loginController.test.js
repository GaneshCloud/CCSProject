/**
 * Created by CSS on 13-06-2016.
 */

describe('#Login Controller', function () {

    beforeEach(module('myApp'));

    var $controller,loginService,spinnerService;
    var $q;
    var deferred;

    var element;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_loginService_,_spinnerService_,$httpBackend,_$q_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        loginService = _loginService_;

        spinnerService = _spinnerService_;

        $q = _$q_;

        deferred = $q.defer();


        $controller('loginController', {
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


        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        spyOn(loginService, 'verifyUser').and.returnValue(deferred.promise);
        spyOn(loginService, 'dashboard').and.returnValue();
        spyOn(loginService, 'loginWithGoogle').and.returnValue();
        spyOn(loginService, 'loginWithFacebook').and.returnValue();
        spyOn(loginService,'checkUser').and.returnValue(deferred.promise);

        deferred.resolve({data:{id: 1,userType:'admin',facebook_img:''}});
        scope.$apply();


    }));

    describe('#form validation',function () {

        it("should return user credentials",function () {

            scope.credentialsInvalid = false;

            var value = scope.showCredentialsError();

            expect(value).toBeDefined();

        });

    });

    describe('#should login with user data', function () {
        it('check login user data', function () {

            // var controller = loginController();

            scope.submit('CBE001','Janani@1');

            deferred.resolve();
            scope.$apply();

            scope.submit('CBE001','Janani@1');

            deferred.resolve({id:1});
            scope.$apply();

        });

        it('Make login Page with Error', function () {
            scope.loginPageWithError();
            expect(scope.user).toBe('');
            expect(scope.password).toBe('');
            expect(scope.credentialsInvalid).toBe(true);

        });
    });

    describe('#should login with social sites', function () {
        it('Facebook login', function () {

            // var controller = loginController();

            scope.loginWithFacebook();
            expect(loginService.loginWithFacebook).toHaveBeenCalled();

        });

        it('Google Login', function () {
            scope.loginWithGoogle();
            expect(loginService.loginWithGoogle).toHaveBeenCalled();

        });
    });

    describe('#should check validity',function () {

        it('should return input validity',function () {

            var data = {
                $valid:true
            }

            var value = scope.isInputValid(data);

            expect(value).toEqual(true);

        });

        it('should return input invalid',function () {

            var data = {
                $invalid:true,
                $dirty:true
            }

            var value = scope.isInputInvalid(data);

            expect(value).toEqual(true);

        });

        it('should return password validity',function () {

            var data = {
                $valid:true
            }

            var value = scope.isPasswordValid(data);

            expect(value).toEqual(true);

        });

        it('should return password invalid',function () {

            var data = {
                $invalid:true,
                $dirty:true
            }

            var value = scope.isPasswordInvalid(data);

            expect(value).toEqual(true);

        });

    });

});