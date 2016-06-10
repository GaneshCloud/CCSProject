
describe('Main Controller', function () {

  beforeEach(module('myApp'));

  var $controller;


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

        var documentListService,scope
        beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
            scope = $rootScope.$new();
            documentListService = _documentListServices_;
            $controller('documentListController', {
                $scope: scope,

            });
        }));


        it('check new document function', function () {
            var fakeHttpPromise = {
                success: function() {}
            };

            spyOn(documentListService, 'newDocument');
            scope.newDocument();
            expect(documentListService.newDocument).toHaveBeenCalled();

        });
    });

        describe("get Data function",function () {

            var documentListService,scope;

            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));


            it("should receive a successful response", function() {
                var fakeHttpPromise = {
                    then: function(data) {
                    }
                }
                spyOn(documentListService, "getDepartment").and.callFake(function() {
                    return  fakeHttpPromise
                });
                scope.getDepartment();
                expect(documentListService.getDepartment).toHaveBeenCalled();  //Verifies this was called
            });
        });

        describe("edit doc function",function () {

            var documentListService,scope;
            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));


            it("should receive a successful response", function() {
                var fakeHttpPromise = {
                    success: function(data) {
                    }
                }
                spyOn(documentListService, "edit").and.callFake(function() {
                    return  fakeHttpPromise
                });
                scope.docs=[{ID:100,DOCCAPTION:'TESTCAP1',DOCDEP:1},
                            {ID:101,DOCCAPTION:'TESTCAP2',DOCDEP:1},
                            {ID:102,DOCCAPTION:'TESTCAP3',DOCDEP:1}];
                scope.editDoc(1);
                expect(documentListService.edit).toHaveBeenCalled();  //Verifies this was called
            });
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

        describe("logout function",function () {

            var documentListService,scope;
            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));

            // it.skip("should receive a successful response", function() {
            //
            //     spyOn(documentListService, "logout");
            //     scope.onLogout();
            //     expect(documentListService.logout).toHaveBeenCalled();  //Verifies this was called
            // });
        });

        describe("goto dashbord function",function () {

            var documentListService,scope;
            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));

            it("should receive a successful response", function() {

                spyOn(documentListService, "goToDashboard");
                scope.goToDashboard();
                expect(documentListService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
            });
        });

        describe("delete doc function",function () {

            var documentListService,scope;

            beforeEach(inject(function ($rootScope, $controller, _documentListServices_,$q,$httpBackend) {
                myHttpBackend = $httpBackend;
                scope = $rootScope.$new();
                documentListService = _documentListServices_;

                $controller('documentListController', {
                    $scope: scope,
                });
                deferred = $q.defer();
                spyPromise = deferred.promise;
                documentListService = jasmine.createSpyObj('documentListService',['delete']);
                documentListService.delete.and.returnValue(spyPromise);

                spyPromise.success = function (fn) {
                    spyPromise.then( function (data) {
                        fn(data);
                    });
                    return spyPromise;
                };

                spyPromise.error = function (fn) {
                    spyPromise.then( undefined, function (status) {
                        fn(status);
                    });
                    return spyPromise;
                };
            }));

            // it("should receive a successful response", function() {
            //     scope.deleteDoc(5);
            //     // myHttpBackend.flush();
            //     deferred.resolve({'name':'value'});
            //     // scope.$digest();
            // });

        });




    });



});