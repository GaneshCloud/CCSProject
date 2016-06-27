/**
 * Created by CSS on 27-06-2016.
 */

(function() {
    angular
        .module('myApp')
        .controller('errorMessageController', errorMessageController);

    errorMessageController.$inject=[
        '$scope'
    ];

    function errorMessageController($scope) {

        if(localStorage.getItem('errorCode') !== null){
            $scope.errorCode = localStorage.getItem('errorCode');
        }
        if(localStorage.getItem('errorNum') !== null){
            $scope.errorNum = localStorage.getItem('errorNum');
        }
        if(localStorage.getItem('fatal') !== null){
            $scope.fatal = localStorage.getItem('fatal');
        }
        if(localStorage.getItem('sqlState') !== null){
            $scope.sqlState = localStorage.getItem('sqlState');
        }
        if(localStorage.getItem('index') !== null) {
            $scope.index = localStorage.getItem('index');
        }
        localStorage.clear();
    }
})();