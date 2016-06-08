// describe('angular',function(){
// it('angulartest',function(){
// expect(true).toBeTruthy();
// });

// });

describe('Main Controller', function(){

    beforeEach(module('myApp'));

    var $controller, $services;

    beforeEach(inject(function(_$controller_){

        $controller = _$controller_;

    }));


    describe('main Controller', function(){

        it('check order',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.order('projectCode');

            console.log(controller);

            expect($scope.reverse).not.toBeTruthy();

        });

        it('check order1',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.order1('projectCode');

            console.log(controller);

            expect($scope.reverse).toBeTruthy();

        });


        it('check searchbox',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.searchBox(1);

            console.log(controller);

            expect($scope.searchText[1]).toBeTruthy();

        });

        it('check search1box',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.search1Box(1);

            console.log(controller);

            expect($scope.searchText[1]).not.toBeTruthy();

        });

        it('check get data',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.getFeedbacks();

            console.log(controller);

            expect(status).toEqual('');

        });



        it('check the post data',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.postData();

            console.log(controller);

            expect($scope.data).not.toBeNull();

        });

        it('check the edit data',function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.getFeedbacks();

            console.log(controller);

            $scope.editData(1);

            expect($scope.isedit).not.toBeTruthy();

        });

        it('check the update data',function(){

            var $scope={};

            var x={projectCode:'1',
                Title:'x',
                Department:'dsg',
                subHeads:'sdf',
                Software:'152',
                Hardware:'2362',
                catlogCode:'sdf',
                Domain:'sdfg'
            };

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.getFeedbacks();

            console.log(controller);

            console.log($scope.datas);
//$scope.updatedata(x,1);
//

        });

        it('check delete the data', function(){

            var $scope={};

            var controller=$controller('projectRegController',{$scope:$scope});

            $scope.getFeedbacks();

            console.log(controller);

            $scope.deleteData();

            expect($scope.id).not.toBeNull();

        });
    });
});

