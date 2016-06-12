describe('get data',function() {
    var $scope, $controller;
    var $q;
    var deferred, projectRegService;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _projectRegService_, $httpBackend) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        projectRegService = _projectRegService_;
        $controller = _$controller_;

        $controller('projectRegController', {
            $scope: $scope

        });

        $httpBackend.when('GET', '/getdata').respond("sample");


        spyOn(projectRegService, 'getFeedbacks').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'postData').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'updateData').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'deleteData').and.returnValue(deferred.promise);
    }));


    it("should receive a successful response", function () {

        spyOn(projectRegService, "goToDashboard");
        $scope.goToDashboard();
        expect(projectRegService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
    });

    it("should receive a successful response", function () {

        spyOn(projectRegService, "logout");
        $scope.onLogout();
        expect(projectRegService.logout).not.toHaveBeenCalled();  //Verifies this was calle
    });

    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.order('projectCode');

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });

    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.order1('projectCode');

        console.log(controller);

        expect($scope.reverse).toBeTruthy();

    });

    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.searchBox(1);

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });
    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.search1Box(1);

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });

    it('check the edit data', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        // $scope.getFeedbacks();

        console.log(controller);

        $scope.showPagination(1);

        expect($scope.isedit).not.toBeTruthy();

    });

    it('check the edit data', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.getFeedbacks();

        console.log(controller);

        $scope.editData(1);

        expect($scope.isedit).not.toBeTruthy();

    });


    it('should get the data', function () {

        $scope.getFeedbacks();
        deferred.resolve({id: 16});
        $scope.$apply();
    });
    it('should getdata', function () {

        $scope.getFeedbacks();
        deferred.reject();
        $scope.$apply();
    });

    it('should post the data', function () {
        var x={projectCode:'1',
                    Title:'7777',
                    Department:'dsg',
                    subHeads:'sdf',
                    Software:'152',
                    Hardware:'2362',
                    catlogCode:'sdf',
                    Domain:'sdfg'
                };
        $scope.postData();
        deferred.resolve(x);
        $scope.$apply();
    });
    it('should resolve promise',function () {
        var x={projectCode:'1',
            Title:'7777',
            Department:'dsg',
            subHeads:'sdf',
            Software:'152',
            Hardware:'2362',
            catlogCode:'sdf',
            Domain:'sdfg'
        };
        $scope.postData();
        deferred.reject(x);
        $scope.$apply();
    });

    it('should resolve promise', function () {

        var y={projectCode:'1',
            Title:'7777',
            Department:'dsg',
            subHeads:'sdf',
            Software:'152',
            Hardware:'2362',
            catlogCode:'sdf',
            Domain:'sdfg',
            id:0
        };

        $scope.dataFilter=[y]
        $scope.updateData(y,0);

        deferred.resolve();
        $scope.$apply();
    });

    it('should get the data', function () {

        $scope.deleteData(16);
        deferred.resolve({id: 16});
        $scope.$apply();
    });



});







// // describe('angular',function(){
// // it('angulartest',function(){
// // expect(true).toBeTruthy();
// // });
//
// // });
//
// describe('Main Controller', function(){
//
//     beforeEach(module('myApp'));
//
//     var $controller, $services;
//
//     beforeEach(inject(function(_$controller_){
//
//         $controller = _$controller_;
//
//     }));
//
//     it('check pagination',function(){
//
//         var $scope={};
//
//         var controller=$controller('projectRegController',{$scope:$scope});
//
//         $scope.showPagination();
//
//         console.log(controller);
//
//         expect($scope.noData).toBeTruthy();
//
//     });
//     // it('check pagination',function(){
//     //
//     //     var $scope={};
//     //
//     //     var controller=$controller('projectRegController',{$scope:$scope});
//     //
//     //     $scope.showPagination1();
//     //
//     //     console.log(controller);
//     //
//     //     expect($scope.noData).not.toBeTruthy();
//     //
//     // });
//
//
//     describe('main Controller', function(){
//
//         it('check order',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.order('projectCode');
//
//             console.log(controller);
//
//             expect($scope.reverse).not.toBeTruthy();
//
//         });
//
//         it('check order1',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.order1('projectCode');
//
//             console.log(controller);
//
//             expect($scope.reverse).toBeTruthy();
//
//         });
//
//
//         it('check searchbox',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.searchBox(1);
//
//             console.log(controller);
//
//             expect($scope.searchText[1]).toBeTruthy();
//
//         });
//
//         it('check search1box',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.search1Box(1);
//
//             console.log(controller);
//
//             expect($scope.searchText[1]).not.toBeTruthy();
//
//         });
//
//
//
//            // it("should receive a successful response", function() {
//            //
//            //     spyOn(projectRegService, "goToDashboard");
//            //     $scope.goToDashboard();
//            //     expect( projectRegService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
//            // });
//            //
//            // it("should receive a successful response", function() {
//            //
//            //     spyOn(documentsearchService, "goToDashboard1");
//            //     $scope.goToDashboard1();
//            //     expect(documentsearchService.goToDashboard).not.toHaveBeenCalled();  //Verifies this was calle
//            // });
//            //
//
//
//
//
//
//         it('check get data',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.getFeedbacks();
//
//             console.log(controller);
//
//             expect(status).toEqual('');
//
//         });
//
//
//
//         it('check the post data',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.postData();
//
//             console.log(controller);
//
//             expect($scope.data).not.toBeNull();
//
//         });
//
//
//
//         it('check the edit data',function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.getFeedbacks();
//
//             console.log(controller);
//
//             $scope.editData(1);
//
//             expect($scope.isedit).not.toBeTruthy();
//
//         });
//
//         it('check the update data',function(){
//
//             var $scope={};
//
//             var x={projectCode:'1',
//                 Title:'x',
//                 Department:'dsg',
//                 subHeads:'sdf',
//                 Software:'152',
//                 Hardware:'2362',
//                 catlogCode:'sdf',
//                 Domain:'sdfg'
//             };
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.getFeedbacks();
//
//             console.log(controller);
//
//             console.log($scope.datas);
// //$scope.updatedata(x,1);
// //
//
//         });
//
//         it('check delete the data', function(){
//
//             var $scope={};
//
//             var controller=$controller('projectRegController',{$scope:$scope});
//
//             $scope.getFeedbacks();
//
//             console.log(controller);
//
//             $scope.deleteData();
//
//             expect($scope.id).not.toBeNull();//dd
//
//         });
//     });
// });
//
