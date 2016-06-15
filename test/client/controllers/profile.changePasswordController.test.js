/**
 * Created by CSS on 14-06-2016.
 */
/**
 * Created by CSS on 13-06-2016.
 */

describe('#Change Password Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService,spinnerService,window;
    var changePasswordService;
    var $q,deferred;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_$window_,_changePasswordService_,_dashboardService_,_spinnerService_,_$q_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        spinnerService = _spinnerService_;

        dashboardService = _dashboardService_;

        changePasswordService = _changePasswordService_;

        window = _$window_;

        $q = _$q_;

        deferred = $q.defer();

        $controller('changePasswordController', {
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

        spyOn(changePasswordService, 'updatePersonalData').and.returnValue(deferred.promise);
        spyOn(changePasswordService, 'getPersonalData').and.returnValue(deferred.promise);
        spyOn(changePasswordService, 'profilePage').and.returnValue();
        // spyOn(dashboardService, 'project').and.returnValue();
        // spyOn(dashboardService, 'forum').and.returnValue();

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

            scope.updatePassword(data);

            deferred.promise.then(function () {
                expect(changePasswordService.updatePersonalData).toHaveBeenCalled();

            });

        });

        it('get Personal DAta', function () {

            scope.getPersonalData();

            deferred.promise.then(function () {
                expect(changePasswordService.getPersonalData).toHaveBeenCalled();

            });

        });

        it('Cancel Change Password', function () {

            scope.onCancelChangePassword();

            deferred.promise.then(function () {
                expect(changePasswordService.profilePage).toHaveBeenCalled();

            });

        });

    });
    
});