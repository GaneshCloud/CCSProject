(function(){

    angular
        .module('myApp')
        .controller('waterMarkController', waterMarkController);
    waterMarkController.$inject = [
        '$scope',
        '$http',
        '$window',
        'unRegisterService'
    ];


    function waterMarkController($scope,$http,$window,unRegisterService)
    {


        $scope.goToDashboard = function() {
            unRegisterService.goToDashboard();
        };

        $scope.mechanical=true;
        $scope.CAD=true;
        $scope.Electronics=true;
        $scope.Mini=true;
        $scope.IEEE=true;
        $scope.Software=true;

        $scope.showMechanical=function(){
            $scope.mechanical=true;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
        };

        $scope.showCAD=function(){
            $scope.mechanical=false;
            $scope.CAD=true;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
        };

        $scope.showElectronics=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=true;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
        };

        $scope.showMini=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=true;
            $scope.IEEE=false;
            $scope.Software=false;
        };

        $scope.showIEEE=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=true;
            $scope.Software=false;
        };

        $scope.showSoftware=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=true;
        };


// $scope.viewer = pdf.Instance("viewer");

//     $scope.nextPage = function() {
//         $scope.viewer.nextPage();
//     };

//     $scope.prevPage = function() {
//         $scope.viewer.prevPage();
//     };

//     $scope.pageLoaded = function(curPage, totalPages) {
//         $scope.currentPage = curPage;
//         $scope.totalPages = totalPages;
//     };

        $scope.showFile = function(id,file){

            var thisFile;

            if(file.split('.').pop()==="doc")

                thisFile="../uploads/waterMarkpdf/"+file+".pdf";
            else
                thisFile="../uploads/waterMarkpdf/"+file;

            $window.open(thisFile);

        };


        $scope.getFileDoc=function(){

            unRegisterService.getFileDoc()


                .then(function(response){

                    $scope.files=response.data;

                    alert('the file was selected');

                    //$scope.window=data;
                })
                .catch(function(error){

                alert('unable to retrive a feedback');
            });
        };

        $scope.getFileDoc();


    }

})();






