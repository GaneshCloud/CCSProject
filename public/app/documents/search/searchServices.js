
'use strict';
myApp.factory('documentSearchServices', function($http) {
    
        return {
            get : function() {
                return $http.get('/api/docs');
            },

            search:function(data){
                return $http.get('/api/search'+data);
            },
            getDepartment:function(){
                return $http.get('/api/dep');
            }
            
            
        };
    });