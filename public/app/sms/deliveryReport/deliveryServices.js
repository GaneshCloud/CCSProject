/**
 * Created by Administrator on 12.07.2016.
 */
(function(){

    angular
        .module("myApp")
        .factory("deliveryServices",deliveryServices);

    deliveryServices.$inject=[
        '$http'
    ];

    function deliveryServices($http){
        return{
            getSmsList:function(data){
                return $http.get("/api/sms/getSmsData");
            },
            getSmsDataById:function(id){
                return $http.get("/api/sms/getSmsDataById/"+id);
            }
        }
    }
})();