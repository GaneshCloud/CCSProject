/**
 * Created by Administrator on 6/9/2016.
 */

describe('single File Upload Controller', function () {
    // beforeEach(module('myApp'));
    // var $controller,controller,$scope={},viewDocumentServices;
    // beforeEach(inject(function(_$controller_,_viewDocumentServices_,$q,$rootScope) {
    //     $controller = _$controller_;
    //     viewDocumentServices = _viewDocumentServices_;
    //     controller = $controller('viewDocumentController', {$scope: $scope});
    //     deferred = $q.defer();
    //     spyOn(viewDocumentServices, "Download").and.returnValue(
    //         {
    //             success: function (c) {
    //                 c(21)
    //             }, error: function (c) {
    //             c(21)
    //         }
    //         }
    //
    //
    //     )}));
    //
    //     //deferred.resolve();
    // it("download the document", function() {
    //     // $scope.Download();
    // })

    var $scope;
    var $q;
    var deferred,viewDocumentServices;

    beforeEach(module('myApp'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _viewDocumentServices_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        viewDocumentServices= _viewDocumentServices_;

        $controller('viewDocumentController', {
            $scope: $scope

        });
        spyOn(viewDocumentServices, 'getDepartment').and.returnValue(deferred.promise);
    }));
    it('should resolve promise', inject(function ($httpBackend) {
        // $httpBackend
        //     .when('GET', '/api/dep')
        //     .respond(200);
        // $scope.getDepartment();
        // expect($httpBackend.flush).not.toThrow();
        // deferred.resolve();
        // $scope.$apply();
        //
        // expect(viewDocumentServices.getDepartment).toHaveBeenCalled();
    }));


});



