/**
 * Created by CSS on 13-06-2016.
 */
/**
 * Created by CSS on 13-06-2016.
 */

describe('#Login Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService,spinnerService,window;
    var deferred;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_$window_,_dashboardService_,_spinnerService_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        spinnerService = _spinnerService_;

        dashboardService = _dashboardService_;

        window = _$window_;

        window = jasmine.createSpyObj('$window', ['confirm']);

        $controller('dashboardController', {
            $scope: scope,
            $window:window
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

        spyOn(dashboardService, 'profile').and.returnValue();
        spyOn(dashboardService, 'logout').and.returnValue();
        spyOn(dashboardService, 'documentation').and.returnValue();
        spyOn(dashboardService, 'project').and.returnValue();
        spyOn(dashboardService, 'forum').and.returnValue();

    }));

    describe('#Dashboard', function () {
        it('Open Profile Page', function () {

            scope.openProfilePage();
            expect(dashboardService.profile).toHaveBeenCalled();

        });

        it('Open Logout Page', function () {
            window.confirm.and.returnValue(true);
            scope.onLogout();
            expect(dashboardService.logout).toHaveBeenCalled();

        });

        it('Open Documentation Page', function () {

            scope.openDocumentation();
            expect(dashboardService.documentation).toHaveBeenCalled();

        });

        it('Open Project Page', function () {
            scope.openProject();
            expect(dashboardService.project).toHaveBeenCalled();

        });

        it('Open Forum Page', function () {
            scope.openForum();
            expect(dashboardService.forum).toHaveBeenCalled();

        });

        it('Should return true only for user', function () {

            expect(scope.showOnlyForUser()).toBeFalsy();

            localStorage.setItem('userType','user');
            expect(scope.showOnlyForUser()).toBeTruthy();


        });
        

    });
});