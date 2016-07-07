(function() {
    angular.module('myApp')
        .directive('myDirective', function () {

            return {

                restrict: 'E',
                scope: {
                    field: '@',
                    orderDsc: '&',
                    orderAsc: '&',
                    visibleArr: '=',
                    searchBox: "&",
                    search1Box: '&'
                },
                replace: true,

                template: '<ul class="dropdown-menu" role="menu"><li><a ng-click="orderAsc()"><span class="glyphicon glyphicon-sort-by-alphabet"></span>&nbsp;Ascending</a></li><li><a ng-click="orderDsc()"><span class="glyphicon glyphicon-sort-by-alphabet-alt"></span>&nbsp;Descending</a></li><li><a ng-click="searchBox()" ng-show="visibleArr"><span class="glyphicon glyphicon-search"></span>&nbsp;Search</a></li><li><a ng-click="search1Box()" ng-hide="visibleArr"><span class="glyphicon glyphicon-search"></span>&nbsp;Hide search</a></li></ul>',
                link:function(scope,elem,attr){

                }

            };
        });
})();


