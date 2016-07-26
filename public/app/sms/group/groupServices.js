/**
 * Created by Administrator on 08.07.2016.
 */

(function() {
    angular
        .module('myApp')
        .factory('groupServices', groupServices);

    groupServices.$inject = [
        '$http'
    ];
    function groupServices ($http) {
        return{
            addGroup:function(data){
                return $http.post("/api/sms/createGroup",data);
            },
            listGroup:function(){
                return $http.get("/api/sms/listGroup");
            },
            deleteGroup:function(id){
                alert();
                return $http.delete("/api/sms/deleteGroup/"+id);
            },
            getMemberByGrpId:function(id){
                return $http.get("/api/sms/getMemberByGrpId/"+id);
            },
            removeFromGroup:function(id){
                return $http.delete("/api/sms/removeFromGroup/"+id);
            }
        }
    }
})();