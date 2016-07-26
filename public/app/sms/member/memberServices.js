/**
 * Created by Administrator on 08.07.2016.
 */

(function() {
    angular
        .module('myApp')
        .factory('memberServices', memberServices);

    memberServices.$inject = [
        '$http'
    ];
    function memberServices ($http) {
        return{
            addMember:function(data){
                return $http.post("/api/sms/createMember",data);
            },
            listMember:function(){
                return $http.get("/api/sms/listMember");
            },
            deleteMember:function(id){
                return $http.delete("/api/sms/deleteMember/"+id);
            },

        }
    }
})();