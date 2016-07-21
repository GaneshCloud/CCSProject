/**
 * Created by Administrator on 12.07.2016.
 */
(function(){

    angular
        .module("myApp")
        .factory("messageServices",messageServices)

    messageServices.$inject=[
        '$http'
    ];

    function messageServices($http){
        return{
            sendSms:function(data){
                return $http.post("/api/sms/sendMessage",data);
            },
            getContactList:function(){
                return $http.get("");
            },
            
        }
    }
})();