describe('getDocFile',function() {
    var $scope, $controller;
    var $q;
    var deferred, unRegisterService;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _unRegisterService_, $httpBackend) {
            $q = _$q_;
            $scope = _$rootScope_;
            deferred = _$q_;
        unRegisterService = _unRegisterService_;
            $controller = _$controller_;

            $controller('waterMarkController', {
                $scope: $scope
            });
       $httpBackend.when('GET', '/fileDoc').respond('sample');
        }));

    it("should receive a successful response", function () {

        spyOn(unRegisterService, "goToDashboard");
        $scope.goToDashboard();
        expect(unRegisterService.goToDashboard).toHaveBeenCalled();
    });

    it('should visible the mechanical dept only', function () {

        var $scope = {};

        var controller = $controller('waterMarkController', {$scope: $scope});

        $scope.showMechanical();

        console.log(controller);

        expect($scope.mechanical).toBeTruthy();

    });

    it('should visible the CAD only', function(){
       var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showCAD();

        console.log(controller);

        expect($scope.CAD).toBeTruthy();

    });
    it('should visible the electronics only', function(){
        var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showElectronics();

        console.log(controller);

        expect($scope.Electronics).toBeTruthy();

    });

    it('should visible the mini projects only', function(){
        var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showMini();

        console.log(controller);

        expect($scope.Mini).toBeTruthy();

    });

    it('should visible the IEEE projects only', function(){
        var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showIEEE();

        console.log(controller);

        expect($scope.IEEE).toBeTruthy();

    });

    it('should visible the software projects only', function(){
        var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showSoftware();

        console.log(controller);

        expect($scope.Software).toBeTruthy();

    });

    it('should show the watermark pdf files', function(){
        var $scope = {};

        var controller = $controller('waterMarkController', {$scope:$scope});

        $scope.showFile(35,'angular.doc');

        console.log(controller);

        expect().not.toBeTruthy();

    });


    it('should get the watermarked pdf files', function () {

        $scope.getFileDoc();
        deferred.resolve({data:[{id: 8},{id:9}]});
        $scope.$apply();
    });
    it('should get the watermarked pdf files of undefined', function () {

        $scope.getFileDoc();
        deferred.reject();
        $scope.$apply();
    });

});

