(function() {
    angular.module('myApp')
        .service('unRegisterService', unRegisterService);

    unRegisterService.$inject=['$http','$window'];

    function unRegisterService($http, $window) {

        this.getFileDoc=function()
        {
            return $http.get('/fileDoc');
        };

        this.goToDashboard = function () {
            $window.location.href = '/profile/dashboard';
        };
    }
})();


