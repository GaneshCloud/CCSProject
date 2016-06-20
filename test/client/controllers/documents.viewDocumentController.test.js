/**
 * Created by Administrator on 6/9/2016.
 */

describe('single File Upload Controller', function () {
    /*jshint expr:true */
    beforeEach(module('myApp'));

    var $controller,viewDocumentServices,starServices,location;
    var $q;
    var deferred,windowObj;

    beforeEach(inject(function(_$controller_,_$rootScope_, _$q_, _viewDocumentServices_,_starServices_,$httpBackend,$location){

        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        deferred_sub = _$q_.defer();
        $controller = _$controller_;
        viewDocumentServices= _viewDocumentServices_;
        starServices=_starServices_;
        $controller('viewDocumentController', {
            $scope: $scope
        });
        windowObj = {location: {href: '/sample?type=5'}};

        spyOn(viewDocumentServices, 'getUser').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getArchieve').and.returnValue(deferred_sub.promise);
        spyOn(viewDocumentServices, 'getNextDoc').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getPrevDoc').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getDocument').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'download').and.returnValue(deferred.promise);
        spyOn(starServices, 'setStar').and.returnValue(deferred.promise);
        spyOn(starServices, 'getStar').and.returnValue(deferred.promise);
        // spyOn(uploadSingleServices, "goToDashboard");
        $httpBackend.when("GET","/api/docs/getDoc?id=undefined").respond("sample");
        $httpBackend.when("GET","/mode").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");
        $httpBackend.when("GET","/api/getStar?DOC_ID=null").respond("sample");

        // $location.path("/sssss?id=5");
        // $scope.$digest();
    }));

    describe('get user',function() {

        it('should resolve promise', function () {
            getUser();
            deferred.resolve({data:{id: 1, STNAME: 'ABC',mode:'Admin'}});
            expect($scope.isAdmin).toBeTruthy;
            $scope.$digest();

        });
        it('should resolve promise', function () {
            getUser();
            deferred.resolve({data:{id: 1, STNAME: 'ABC',mode:'user'}});
            expect($scope.isAdmin).toBeTruthy;
            $scope.$digest();

        });
        it('should resolve promise', function () {

            getUser();
            deferred.reject();
            expect($scope.dep).toBeArray;
            $scope.$digest();
        });
    });

    describe('get document',function() {

        it('should resolve promise', function () {
           
            getDocument ();
            deferred.resolve({data:[{id: 1, docCaption:'ABC',docDep:2,docFile:'C:/SAMPLE.PNG'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });


        it('should resolve promise', function () {

            getDocument ();
            deferred.reject();
            expect($scope.isAdmin).not.toBetruthy;
            $scope.$digest();
        });

        it('should resolve promise', function () {
            // window.location.href="sample/type=5"
            getDocument ();
            deferred.resolve({data:[{id: 1, docCaption:'ABC',docDep:2,docFile:'C:/SAMPLE.PNG'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });
    });

    describe('download',function() {

        it('should resolve promise', function () {
            $scope.download (101);
            deferred.resolve("success");
            $scope.$digest();

        });
        it('should resolve promise', function () {

            $scope.download (101);
            deferred.reject("errorss");
            $scope.$digest();
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

    describe('setstaring',function(){

        it('should resolve promise',function () {
            $scope.staring();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.staring();
            deferred.reject();
            $scope.$apply();
        });
    });

    describe('get star rating',function(){

        it('should resolve promise',function () {
            getStar ();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            getStar ();
            deferred.reject();
            $scope.$apply();
        });
    });

    describe('get next documents',function(){
        it('should return ',function () {
            $scope.doc=[];
            $scope.getNext   (5);
            expect($scope.doc.length).toBeLessThan(1);

        });

        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext  (5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.doc.ID='undefined';
            $scope.getNext(5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext  (5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            deferred_sub.reject();
            $scope.$apply();
        });

        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext  (5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            deferred_sub.resolve({data:"file1"});
            $scope.$apply();
        });

        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext(5);
            deferred.resolve({data:'invalid'});
            expect($scope.isExist).not.toBeTruthy();
            $scope.$digest();

        });

        it('check data length',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext(5);
            deferred.resolve({data:[]});
            $scope.$digest();

        });
        it('check data length',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getNext(5);
            deferred.reject();
            $scope.$digest();

        });
    });

    describe('get previous documents',function(){

        it('should return ',function () {
            $scope.doc=[];
            $scope.getPrevios   (5);
            expect($scope.doc.length).toBeLessThan(1);

        });

        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getPrevios   (5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.doc.ID ='undefined';
            $scope.getPrevios (5);
            deferred.resolve({data:[{id:1,docCaption:'ABC',docType:5,docFile:"C:/ABC.PNG"}]});
            $scope.$digest();

        });

        it('should resolve promise',function () {
            $scope.doc=[{ID:1},{ID:2}];
            $scope.getPrevios   (5);
            deferred.reject();
            $scope.$apply();
        });
    });



});



