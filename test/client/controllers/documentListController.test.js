
describe('Main Controller', function () {

  beforeEach(module('myApp'));

  var $controller,$factory,mockServiceA;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;

  }));

    describe('main Controller', function () {
    it('check getDepartments', function () {
      var $scope = {};
      var controller = $controller('documentListController', { $scope: $scope });
     
      $scope.getDepartment();
      expect($scope.dep).not.toBeNull();
    }); 

  describe("Rating info function",function () {
      it('check rating info with integer value', function () {
          var $scope = {};
          var id=508;
          var controller = $controller('documentListController', { $scope: $scope });

          $scope.getRateInfo(id);
          console.log($scope.rateInfo);
          expect($scope.rateInfo).not.toBeNull();
      });

      it('check rating info with null string', function () {
          var $scope = {};
          var id='';
          var controller = $controller('documentListController', { $scope: $scope });

          var res=$scope.getRateInfo(id);
          expect(res).toBe(false);
      });

      it('check rating info with null value', function () {
          var $scope = {};
          var id=null;
          var controller = $controller('documentListController', { $scope: $scope });

          var res=$scope.getRateInfo(id);
          expect(res).toBe(false);
      });
      it('check rating info with string value', function () {
          var $scope = {};
          var id='abc';
          var controller = $controller('documentListController', { $scope: $scope });

          var res=$scope.getRateInfo(id);
          expect(res).toBe(false);
      });

  });


    describe("Oreder Function",function () {
        it('check order with field value', function () {
            var $scope = {};
            var field='DOCCAPTION';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            console.log($scope.isReverse);
            expect($scope.isReverse).toBeTruthy();
        });

        it('check order with field value', function () {
            var $scope = {};
            var field='DOCDEP';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            console.log($scope.isReverse);
            expect($scope.isReverse).not.toBeTruthy();

            $scope.orderMe(field);
            expect($scope.isReverse).toBeTruthy();
        });

        it('check order with field value', function () {
            var $scope = {};
            var field='';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).toMatch('false');

        });

        it('check order with field value', function () {
            var $scope = {};
            var field=null;
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).toMatch('false');

        });

        it('check order with field value', function () {
            var $scope = {};
            var field='';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            console.log($scope.isReverse);
            expect($scope.rateInfo).not.toBeNull();
        });



    });

    describe("new Document",function () {

        beforeEach(function() {
            mockServiceA = jasmine.createSpyObj('mockServiceA', ['newDocument']);
            // $provide.value('documentListServices', mockServiceA);
            documentListServices=mockServiceA;
            // console.log(mockServiceA);

        });

        // beforeEach(inject(function($rootScope, $controller) {
        //     $scope = $rootScope.$new();
        //     $controller('ControllerB', {
        //         $scope: $scope
        //     });
        // }));

        // describe('ControllerB', function() {
        //     it('should call mock service', function() {
        //         expect(mockServiceA.foo).not.toHaveBeenCalled();
        //         $scope.useServiceA();
        //         expect(mockServiceA.foo).toHaveBeenCalled();
        //     });
        // });

        // it('check new document function', function () {
        //     var $scope = {};
        //     var controller = $controller('documentListController', {$scope: $scope});
        //     spyOn($scope, "newDocument").and.callFake();
        //     $scope.newDocument();
        //     expect(mockServiceA.newDocument).toHaveBeenCalled();
        //    // spyOn(, '').and.returnValue(true) // Jasmine
        //
        // });
    });



    describe("get icon function",function () {
        it('check get Icon function', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
             $result=$scope.getIcon(1);
             expect($result).toMatch('images/documents/pdf.png');



        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon(null);
            expect($result).not.toBeTruthy();
        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon('');
            expect($result).not.toBeTruthy();
        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon('abc');
            expect($result).not.toBeTruthy();
        });


});



   
  });



});