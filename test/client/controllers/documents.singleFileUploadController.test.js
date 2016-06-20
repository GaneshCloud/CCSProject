/**
 * Created by Administrator on 6/9/2016.
 */
describe('single File Upload Controller', function () {
    /*jshint expr:true */
    beforeEach(module('myApp'));

    var $controller,uploadSingleServices,dashboardService;
    var $q;
    var deferred;

    beforeEach(inject(function(_$controller_,_$rootScope_, _$q_, _uploadSingleServices_,_dashboardService_,$httpBackend){

        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        $controller = _$controller_;
        uploadSingleServices= _uploadSingleServices_;
        dashboardService=_dashboardService_;

        $controller('singleFileUploadController', {
            $scope: $scope
        });

        spyOn(uploadSingleServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn(uploadSingleServices, 'getDocument').and.returnValue(deferred.promise);
        spyOn(uploadSingleServices, "goToDashboard");
        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");


    }));

        describe("get pattern", function () {
            it('check get pattern correct data', function () {
                var id = 2;
                $scope.getPattern(id);
                expect($scope.docPattern).toMatch($scope.type[id - 1].ptrn);
            });

            it('check wih null', function () {
                var res = $scope.getPattern(null);
                expect(res).not.toBeTruthy();
            });

            it('check wih null', function () {
                var res = $scope.getPattern('abc');
                expect(res).not.toBeTruthy();
            });

            it('check wih null', function () {
                var res = $scope.getPattern('');
                expect(res).not.toBeTruthy();
            });

        });

        // describe("multiple file upload",function() {
        //     it('check single file upload', function () {
        //
        //         spyOn(uploadSingleServices, 'multipleFileUpload');
        //         $scope.multipleFileUpload();
        //         expect(uploadSingleServices.multipleFileUpload).toHaveBeenCalled();
        //
        //     });
        // });
        // describe("document list",function() {
        //     it('check single file upload', function () {
        //
        //         spyOn(uploadSingleServices, 'documentList');
        //         $scope.documentList ();
        //         expect(uploadSingleServices.documentList).toHaveBeenCalled();
        //
        //     });
        // });

        describe('edit document',function() {

            it('should resolve promise', function () {
                $scope.editForm();
                deferred.resolve({data:[{id: 1, DEP_NAME: 'ABC'}, {id: 2, DEP_NAME: 'xds'}]});

                expect($scope.dep).toBeObject;
                $scope.$digest();

            });
            it('should resolve promise', function () {

                $scope.editForm();
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$apply();
            });
        });

        describe('get department',function(){

            it('should resolve promise',function () {
                getDepartment();
                deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
                expect($scope.dep).toBeObject;
                $scope.$digest();

            });
            it('should resolve promise',function () {
                getDepartment();
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$apply();
            });
        });

        describe("goto dashbord function",function () {

            it("should receive a successful response", function() {
                $scope.goToDashboard();
                expect(uploadSingleServices.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
            });
        });

    
});