/**
 * Created by Administrator on 14.07.2016.
 */
(function(){

    angular
        .module("myApp")
        .factory("advancedFbFriendsListServices",advancedFbFriendsListServices);

    advancedFbFriendsListServices.$inject=[
        '$http'
    ];

    function advancedFbFriendsListServices($http){
        return{
            getFriendsList:function(data){
                return $http.get("/api/fb/getFriendsList");
            },
            sendMessage:function(data){
                return $http.post("/api/fb/sendMessage",data);
            },
            getMessageById:function(id){
                return $http.get("/api/fb/getMessageById?id="+id);
            },
            token:function(id){
                return $http.get("/my/api/abcde/endpoint");
            },
            sendFile:function (data) {
                var fd = new FormData();
                fd.append('file', data.attachment);
                fd.append('userId', data.id);

                return $http.post('/api/fb/fileUpload', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
            }
        }
    }
})();