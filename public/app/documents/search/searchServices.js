
'use strict';
myApp.factory('documentSearchServices', function($http,$window) {
    
        return {
            get : function() {
                return $http.get('/api/docs');
            },

            search:function(data){
                return $http.get('/api/search'+data);
            },
            getDepartment:function(){
                return $http.get('/api/dep');
            },
            logout: function () {
                $window.location.href = '/logout';
            },
            goToDashboard: function () {
                $window.location.href = '/profile/userDashboard';
            },
            
            
        };
    });