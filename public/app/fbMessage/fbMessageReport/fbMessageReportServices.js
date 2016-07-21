/**
 * Created by Administrator on 12.07.2016.
 */
(function(){

    angular
        .module("myApp")
        .factory("fbMessageReportServices",fbMessageReportServices);

    fbMessageReportServices.$inject=[
        '$http'
    ];

    function fbMessageReportServices($http){
        return{
            fbMsgLst:function(){
                return $http.get("/api/fb/getFbMessages");
            },
            // getSmsDataById:function(id){
            //     return $http.get("/api/sms/getSmsDataById/"+id);
            // }
        }
    }
})();