/**
 * Created by Administrator on 6/9/2016.
 */
describe('single File Upload Controller', function () {

    beforeEach(module('myApp'));

    var $controller,controller,$scope={};

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        controller = $controller('singleFileUploadController', { $scope: $scope });
    }));

        describe("get pattern", function () {
            // it('check get pattern correct data', function () {
            //     var id = 2;
            //     $scope.getPattern(id);
            //     //expect($scope.docPattern).toMatch($scope.type[id - 1].ptrn);
            // });

            // it('check wih null', function () {
            //     var res = $scope.getPattern(null);
            //     expect(res).not.toBeTruthy();
            // });
            //
            // it('check wih null', function () {
            //     var res = $scope.getPattern('abc');
            //     expect(res).not.toBeTruthy();
            // });
            //
            // it('check wih null', function () {
            //     var res = $scope.getPattern('');
            //     expect(res).not.toBeTruthy();
            // });

        });

        // describe("save document", function () {
        //     it('save document', function () {
        //         //$scope.saveDoc();
        //     });
        // });

        // describe("save document", function () {
        //
        //     beforeEach(inject(function ($rootScope, $controller, _uploadSingleServices_) {
        //         singleUploadService = _uploadSingleServices_;
        //     }));
        //
        //     it('check single file upload', function () {
        //
        //         spyOn(singleUploadService, 'documentList');
        //         $scope.documentList();
        //         expect(singleUploadService.documentList).toHaveBeenCalled();
        //
        //     });
        //
        // });
});