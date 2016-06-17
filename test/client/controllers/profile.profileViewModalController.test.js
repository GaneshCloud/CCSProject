/**
 * Created by CSS on 17-06-2016.
 */

describe('#profile View Modal Controller', function () {

    beforeEach(module('myApp'));

    var $controller;
    var scope;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;
        $controller('profileViewModalController', {
            $scope: scope
        });
        
    }));

    describe('#profile modal view', function () {
        it('show view', function () {
           
            scope.showView('local');
            expect(localStorage.getItem('localView')).toEqual('true');
            expect(localStorage.getItem('googleView')).toEqual('false');
            expect(localStorage.getItem('facebookView')).toEqual('false');

            scope.showView('facebook');
            expect(localStorage.getItem('facebookView')).toEqual('true');
            expect(localStorage.getItem('googleView')).toEqual('false');
            expect(localStorage.getItem('localView')).toEqual('false');

            scope.showView('google');
            expect(localStorage.getItem('googleView')).toEqual('true');
            expect(localStorage.getItem('localView')).toEqual('false');
            expect(localStorage.getItem('facebookView')).toEqual('false');

        });

    });

});