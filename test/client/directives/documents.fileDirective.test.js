/**
 * Created by Administrator on 6/1/2016.
 */

describe('File Directive', function () {
    var element,
        name = 'Homer',scope,data;
    beforeEach(function () {
        module('myApp');
        element = angular.element('<input type="file" valid-file  ng-model="data"">');
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.doc_file = name;
            scope.data="abc";
            $compile(element)(scope);

        });
    });
    it('says hello', function () {
        expect(scope.data).toMatch('abc');
        element.triggerHandler('change');
        scope.$digest();
    });
});
