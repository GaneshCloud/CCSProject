/**
 * Created by Administrator on 6/9/2016.
 */

describe('single File Upload Controller', function () {

    beforeEach(module('myApp'));

    var $controller,viewDocumentServices,starServices;
    var $q;
    var deferred,windowObj;

    beforeEach(inject(function(_$controller_,_$rootScope_, _$q_, _viewDocumentServices_,_starServices_,$httpBackend){

        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        $controller = _$controller_;
        viewDocumentServices= _viewDocumentServices_;
        starServices=_starServices_;

        $controller('viewDocumentController', {
            $scope: $scope
        });
        windowObj = {location: {href: '/sample?type=5'}};

        spyOn(viewDocumentServices, 'getUser').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getArchieve').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getNextDoc').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'getPrevDoc').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'edit').and.returnValue(deferred.promise);
        spyOn(viewDocumentServices, 'Download').and.returnValue(deferred.promise);
        spyOn(starServices, 'setStar').and.returnValue(deferred.promise);
        spyOn(starServices, 'getStar').and.returnValue(deferred.promise);
        // spyOn(uploadSingleServices, "goToDashboard");
        $httpBackend.when("GET","/api/docs/edit?id=null").respond("sample");
        $httpBackend.when("GET","/mode").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");
        $httpBackend.when("GET","/api/getStar?DOC_ID=null").respond("sample");


    }));

    describe('get user',function() {

        it('should resolve promise', function () {
            $scope.getUser();
            deferred.resolve({data:[{id: 1, STNAME: 'ABC',mode:'Admin'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });
        it('should resolve promise', function () {
            $scope.getUser();
            deferred.resolve({data:[{id: 1, STNAME: 'ABC',mode:'user'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });
        it('should resolve promise', function () {

            $scope.getUser();
            deferred.reject();
            expect($scope.dep).toBeArray;
            $scope.$digest();
        });
    });

    describe('get document',function() {

        it('should resolve promise', function () {
            $scope.getDocument ();
            deferred.resolve({data:[{id: 1, DOCCAPTION:'ABC',DOCDEP:2,DOCFILE:'C:/SAMPLE.PNG'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });


        it('should resolve promise', function () {

            $scope.getDocument ();
            deferred.reject();
            expect($scope.isAdmin).not.toBetruthy;
            $scope.$digest();
        });

        it('should resolve promise', function () {
            // window.location.href="sample/type=5"
            $scope.getDocument ();
            deferred.resolve({data:[{id: 1, DOCCAPTION:'ABC',DOCDEP:2,DOCFILE:'C:/SAMPLE.PNG'}]});
            expect($scope.isAdmin).toBetruthy;
            $scope.$digest();

        });
    });

    describe('download',function() {

        it('should resolve promise', function () {
            $scope.Download (101);
            deferred.resolve("success");
            $scope.$digest();

        });
        it('should resolve promise', function () {

            $scope.Download (101);
            deferred.reject("errorss");
            $scope.$digest();
        });
    });

    describe('get department',function(){

        it('should resolve promise',function () {
            $scope.getDepartment();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            expect($scope.dep).toBeObject;
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.getDepartment();
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
            $scope.getStar ();
            deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.getStar ();
            deferred.reject();
            $scope.$apply();
        });
    });

    describe('get next documents',function(){

        it('should resolve promise',function () {
            $scope.getNext  (5);
            deferred.resolve({data:[{id:1,DOCCAPTION:'ABC',DOCTYPE:5,DOCFILE:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.doc.ID='undefined'
            $scope.getNext(5);
            deferred.resolve({data:[{id:1,DOCCAPTION:'ABC',DOCTYPE:5,DOCFILE:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.getNext  (5);
            deferred.reject();
            $scope.$apply();
        });
    });

    describe('get previous documents',function(){

        it('should resolve promise',function () {
            $scope.getPrevios   (5);
            deferred.resolve({data:[{id:1,DOCCAPTION:'ABC',DOCTYPE:5,DOCFILE:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.doc.ID='undefined'
            $scope.getPrevios (5);
            deferred.resolve({data:[{id:1,DOCCAPTION:'ABC',DOCTYPE:5,DOCFILE:"C:/ABC.PNG"}]});
            $scope.$digest();

        });
        it('should resolve promise',function () {
            $scope.getPrevios   (5);
            deferred.reject();
            $scope.$apply();
        });
    });



});



