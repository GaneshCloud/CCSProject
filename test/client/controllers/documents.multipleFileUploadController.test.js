/**
 * Created by Administrator on 6/8/2016.
 */

describe('Main Controller', function () {

    beforeEach(module('myApp'));

    var $controller,controller,$scope={};

    beforeEach(inject(function(_$controller_){

        $controller = _$controller_;
        controller = $controller('multipleFileUploadController', { $scope: $scope });

    }));

    describe('multiple File Upload Controller', function () {
        it('check row increment', function () {

            var length=$scope.rows.length;
            $scope.addRow();
            expect($scope.rows.length).toBeGreaterThan(length);
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
        describe("save document",function(){
            it('save document', function () {
                //$scope.saveDoc();
            });
        });

        describe("save document",function(){

            beforeEach(inject(function ($rootScope, $controller, _uploadMultipleServices_) {
                scope = $rootScope.$new();
                multipleUploadService = _uploadMultipleServices_;
            }));

            it('check single file upload', function () {

                spyOn(multipleUploadService, 'singleFileUpload');
                $scope.singleFileUpload();
                expect(multipleUploadService.singleFileUpload).toHaveBeenCalled();

            });

        });

        describe("get department function",function () {



            beforeEach(inject(function ($rootScope, $controller, _uploadMultipleServices_) {
                scope = $rootScope.$new();
                multipleUploadService = _uploadMultipleServices_;
            }));


            // it("should receive a successful response", function() {
            //     var fakeHttpPromise = {
            //         success: function(data) {
            //         },
            //         error:function(){
            //
            //         }
            //     }
            //     spyOn(multipleUploadService, "getDepartment").and.callFake(function() {
            //         return  fakeHttpPromise
            //     });
            //     $scope.getDepartment();
            //     expect(multipleUploadService.getDepartment).toHaveBeenCalled();  //Verifies this was called
            // });
        });






    });



});