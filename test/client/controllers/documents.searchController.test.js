/**
 * Created by Administrator on 6/8/2016.
 */

describe('Search Controller', function () {

    beforeEach(module('myApp'));

    var $controller, controller, $scope = {};

    beforeEach(inject(function (_$controller_) {

        $controller = _$controller_;
        controller = $controller('searchController', {$scope: $scope});

    }));

    describe('#search Controller', function () {

            beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
                searchService = _documentSearchServices_;
            }));

            it('check view of the list', function () {
                $scope.stLst = false;
                $scope.changeView();
                expect($scope.stLst).toBeTruthy();
                expect($scope.srcViews).toMatch('app/documents/search/searchListView.html')

            });

            it('check single file upload', function () {
                $scope.stLst = true;
                $scope.changeView();
                expect($scope.stLst).not.toBeTruthy();
                expect($scope.srcViews).toMatch('app/documents/search/searchTileView.html')

            });

    });

    describe("get icon function",function () {

        beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
            searchService = _documentSearchServices_;
        }));

        it('check get Icon function', function () {
            $result=$scope.getIcon(1);
            expect($result).toMatch('images/documents/pdf.png');
        });

        it('check get Icon function with null', function () {
            $result=$scope.getIcon(null);
            expect($result).toMatch('images/documents/all.png');
        });

        it('check get Icon function with null', function () {
            $result=$scope.getIcon('');
            expect($result).toMatch('images/documents/all.png');
        });

        it('check get Icon function with null', function () {
            $result=$scope.getIcon('abc');
            expect($result).toMatch('images/documents/all.png');
        });


    });

    describe('#change document', function () {

        beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
            searchService = _documentSearchServices_;
        }));

        it('check view of the list', function () {
            $scope.changeDocument(1);
            expect($scope.searchkey.docType).toEqual(1);


        });

        it('check view of the list', function () {
            var res=$scope.changeDocument(null);
            expect(res).not.toBeTruthy();


        });

    });

    describe('#orderMe Function', function () {

        beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
            searchService = _documentSearchServices_;
        }));

        it('check view of the list', function () {
            $scope.field="DOCCAPTION";
            $scope.isReverse=false;
            $scope.orderMe('DOCCAPTION');
            expect($scope.isReverse).toEqual(true);


        });

        it('check view of the list', function () {
            $scope.field="DOCDEP";
            $scope.isReverse=false;
            $scope.orderMe('DOCCAPTION');
            expect($scope.field).toEqual('DOCCAPTION');
            expect($scope.isReverse).toEqual(false);


        });

    });

    describe("goto dashbord function",function () {

        var documentListService,scope;
        beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
            documentsearchService = _documentSearchServices_;
        }));

        it("should receive a successful response", function() {

            spyOn(documentsearchService, "goToDashboard");
            $scope.goToDashboard();
            expect(documentsearchService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
        });
    });

    describe("logout function",function () {

        var documentListService,scope;
        beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
            documentsearchService = _documentSearchServices_;

        }));

        // it.skip("should receive a successful response", function() {
        //
        //     spyOn(documentListService, "logout");
        //     scope.onLogout();
        //     expect(documentListService.logout).toHaveBeenCalled();  //Verifies this was called
        // });
    });

});