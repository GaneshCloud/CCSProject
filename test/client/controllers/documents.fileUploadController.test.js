/**
 * Created by Administrator on 6/8/2016.
 */

describe('Main Controller', function () {
    /*jshint expr:true */
    beforeEach(module('myApp'));

    var $controller,uploadMultipleServices,dashboardService,documentObj,departmentServices,$location;
    var $q;
    var deferred;
    

    beforeEach(inject(function(_$location_,_$controller_,_$rootScope_, _$q_, _fileUploadServices_,_departmentServices_,_dashboardService_,$httpBackend){

        $q = _$q_;

        $scope = _$rootScope_.$new();
        $location=_$location_;
        deferred = _$q_.defer();
        $controller = _$controller_;
        uploadMultipleServices= _fileUploadServices_;
        dashboardService=_dashboardService_;
        departmentServices=_departmentServices_;

        $controller('fileUploadController', {
            $scope: $scope
        });

        spyOn(departmentServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn($location, 'path').and.returnValue('/documents/editDoc');
        spyOn($location, 'search').and.returnValue({id:12} );
        spyOn(uploadMultipleServices, "goToDashboard");
        spyOn(uploadMultipleServices, 'getDocument').and.returnValue(deferred.promise);
        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");
        var frm = document.createElement('FORM');
        frm.name="frmDoc";
        document.body.appendChild(frm);
        document.forms.frmDoc.submit = jasmine.createSpy('HTML Element').and.callFake(function() {
        });


    }));

        describe('multiple File Upload Controller', function () {

            it('check row increment', function () {

                var length=$scope.rows.length;
                $scope.addRow();
                expect($scope.rows.length).toBeGreaterThan(length);
            });

            it('check for submit form', function () {
                var controller = $controller('fileUploadController', { $scope: $scope });
                $scope.saveDoc ();
            });

        describe('get department',function(){

            it("getedit doc",function(){
                var controller = $controller('fileUploadController', { $scope: $scope });
                $scope.$apply();
                $scope.$digest();
                expect($location.path).toHaveBeenCalled();
            });

            it('should resolve promise',inject(function ($httpBackend) {

                $httpBackend.when("GET","/api/dep").respond("sample");
                getDepartment();
                deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});

                expect($scope.dep).toBeObject;
                $scope.$digest();

            }));
            it('should resolve promise',inject(function ($httpBackend) {
                $httpBackend.when("GET","/api/dep").respond("sample");

                getDepartment();
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$apply();
            }));
        });



        describe("removing row",function(){
            it('check row deleting', function () {
                $scope.rows = [1, 2,3];
                var length=$scope.rows.length;
                $scope.removeRow();
                expect($scope.rows.length).toEqual(length-1);
            });

            it('check row deleting by defualt', function () {
                var length=$scope.rows.length;
                $scope.removeRow();
                expect($scope.rows.length).toEqual(2);
            });

        });

        describe("get pattern",function(){
            it('check get pattern correct data', function () {
                var id=2;
                $scope.getPattern(id);
                expect($scope.docPattern).toMatch($scope.type[id - 1].ptrn);
            });

            it('check wih null', function () {
                var res=$scope.getPattern(null);
                expect(res).not.toBeTruthy();
            });

            it('check wih null', function () {
                var res=$scope.getPattern('abc');
                expect(res).not.toBeTruthy();
            });

            it('check wih null', function () {
                var res=$scope.getPattern('');
                expect(res).not.toBeTruthy();
            });

        });


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
        describe("goto dashbord function",function () {

            it("should receive a successful response", function() {
                $scope.goToDashboard();
                expect(uploadMultipleServices.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
            });
        });






    });



});