/**
 * Created by CSS on 28-06-2016.
 */

describe('#Error Message Controller', function () {

    beforeEach(module('myApp'));

    var $controller,scope;

    beforeEach(inject(function (_$controller_,_$rootScope_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        localStorage.setItem('errorCode','');
        localStorage.setItem('errorNum','');
        localStorage.setItem('fatal','');
        localStorage.setItem('sqlState','');
        localStorage.setItem('index','');

        $controller('errorMessageController', {
            $scope: scope
        });

    }));

    describe("error message controller",function () {
        it('should initialize error data',function () {


        });
    });

});