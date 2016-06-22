/**
 * Created by Administrator on 6/8/2016.
 */

describe('Search Controller', function () {
    /*jshint expr:true */
    beforeEach(module('myApp'));

    var $controller,documentSearchServices,dashboardService,iconServices,departmentServices;
    var $q;
    var deferred;

    beforeEach(inject(function(_$controller_,_$rootScope_, _$q_, _documentSearchServices_,_departmentServices_,_iconServices_,_dashboardService_,$httpBackend){

        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        $controller = _$controller_;
        documentSearchServices= _documentSearchServices_;
        dashboardService=_dashboardService_;
        iconServices=_iconServices_;
        departmentServices=_departmentServices_;

        $controller('searchController', {
            $scope: $scope
        });

        spyOn(departmentServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn(documentSearchServices, "goToDashboard");
        spyOn(documentSearchServices, "search").and.returnValue(deferred.promise);
        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/api/search?docType=-1&dep=-1&page=undefined&serStr=").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");


    }));

    describe("getClass function",function(){
       it("#get class defualt ",function(){
           $scope.searchkey.docType=2;
            var res=$scope.getClass(2);
           expect(res).toEqual('active');
       }) ;
        it("#get class new ",function(){
            $scope.searchkey.docType=2;
            var res=$scope.getClass(1);
            expect(res).toEqual('');
        }) ;
        it("#get class new ",function(){
            $scope.searchkey.docType=2;
            var res=$scope.getClass('');
            expect(res).not.toBeTruthy;
        }) ;
        it("#get class new ",function(){
            $scope.searchkey.docType=2;
            var res=$scope.getClass(null);
            expect(res).not.toBeTruthy;
        }) ;
        it("#get class new ",function(){
            $scope.searchkey.docType=2;
            var res=$scope.getClass('abc');
            expect(res).not.toBeTruthy;
        }) ;

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

    describe('get search data',function(){

        it('should resolve promise',inject(function ($httpBackend) {
            $scope.searchData();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            expect($scope.dep).toBeObject;
            $scope.$digest();

        }));
        it('should resolve promise',inject(function ($httpBackend) {
            $scope.searchData();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            expect($scope.dep).toBeObject;
            $scope.$digest();

        }));
        it('should resolve promise', function () {

            $scope.searchData ();
            deferred.resolve({data:[]});
            expect($scope.noData).toBeTruthy;
            $scope.$digest();
        });
        it('should resolve promise',inject(function ($httpBackend) {
            $scope.searchData();
            deferred.reject();
            expect($scope.dep).toBeArray;
            $scope.$digest();
        }));
    });

    describe('paginate',function(){

        it('should resolve promise', function () {
            $scope.curPage=1;
            $scope.itemsPage=5;
            var res=$scope.paginate({docCaption:'caption1',id:2},{docCaption:'caption2',id:2});
            expect(res).not.toBeNull;

        });

    });
    describe('#search Controller', function () {

            beforeEach(inject(function ($rootScope, $controller, _documentSearchServices_) {
                searchService = _documentSearchServices_;
            }));

            it('check view of the list', function () {
                $scope.stLst = false;
                $scope.changeView();
                expect($scope.stLst).toBeTruthy();
                expect($scope.srcViews).toMatch('app/documents/search/searchListView.html');

            });

            it('check single file upload', function () {
                $scope.stLst = true;
                $scope.changeView();
                expect($scope.stLst).not.toBeTruthy();
                expect($scope.srcViews).toMatch('app/documents/search/searchTileView.html');

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

    describe("goto dashbord function",function () {
        it("should receive a successful response", function() {
            $scope.goToDashboard();
            expect(documentSearchServices.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
        });
    });



});