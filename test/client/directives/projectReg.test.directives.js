
describe('projectReg directive',function(){
var element,scope,data;
    
    beforeEach(function(){
        module('myApp');
        element=angular.element('<my-directive field="projectCode" search-box="searchBox(0)" search1-box="search1Box(0)"" visible-arr="visible[0]" order-dsc="order1(field)" order-asc="order(field)"></my-directive>');
        inject(function($rootScope, $compile){
           scope = $rootScope.$new();
            $compile(element)(scope);
           scope.field="projectCode";
           scope.$digest();

        });
    });

    it('reuse functions',function (){
    
    });
});
