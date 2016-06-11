/**
 * Created by CSS on 09-06-2016.
 */
describe('login Controller', function () {

    beforeEach(module('myApp'));

    var $controller,$factory,mockServiceA;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;

    }));

    describe('main Controller', function () {
        it('check getDepartments', function () {
            var $scope = {};
            var controller = $controller('documentListController', {$scope: $scope});

            $scope.getDepartment();
            expect($scope.dep).not.toBeNull();
        });
    });
});