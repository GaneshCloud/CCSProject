/**
 * Created by CSS on 13-06-2016.
 */

describe('#Logout Controller', function () {

    beforeEach(module('myApp'));

    var $controller,scope;

    beforeEach(inject(function (_$controller_,_$rootScope_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        $controller('logoutController', {
            $scope: scope
        });

    }));

    describe("logout controller",function () {
        it('should initialize user credentials',function () {

            scope.userCredentials = false;

        });
    });

});