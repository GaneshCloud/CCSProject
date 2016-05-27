'use strict';
myApp.factory('uploadSingleServices', function($http,$window) {
        
        return {
            
            create : function(docData) {
                return $http.post('/upload', docData);
            },
            edit : function(id) {
                
                 return $http.get('/api/docs/edit?id='+id);   
            },
        
            getDepartment:function(){
                return $http.get('/api/dep');
            },
            multipleFileUpload:function(){
                $window.location.href="/documents/multipleFileUpload";
            },
            documentList:function(){
                $window.location.href="/documents/documentList";
            }
            
        };
    });