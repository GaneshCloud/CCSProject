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
        if(localStorage.getItem('error')) {
            $scope.error = localStorage.getItem('error');
            localStorage.setItem('error', null);
        }
    }
})();