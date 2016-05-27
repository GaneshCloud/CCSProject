(function(){
    function projectRegController($scope,$http,$window,projectRegService){

        $scope.names = ["mechanical", "mechatronics", "ECE", "CS", "IT"];
        $scope.Title = ["Mechanical Projects", "Aeronatical Projects", "ECE Projects", "Embaded projects", "IT Projects"];
        $scope.subHeads = ["CEA-ATMEL", "CEA-OTHERS", "CEC-PC BASED", "CEA-DSP PROJECTS", "IEEE PAPERS"];
        $scope.catlogCode = ["CIS-C# NET PROJECTS", "CDB BIO MEDICAL PROJECTS", "C,C++ AND VC++ PROJECTS", "CAD/CAM/CAE PROJECTS", "CIVIL DESIGN PROJECTS"];
        $scope.Domain = ["RFID", "ROBOTICS", "BIOMEDICAL PROJECTS", "C,C++ AND VC++ PROJECTS", "CIVIL DESIGN Projects"];
        // $scope.asc=false;
        $scope.datas=[];
        $scope.isEdit=true;

        $scope.new={projectCode:'',
            Title:'',
            Department:'',
            subHeads:'',
            Software:'',
            Hardware:'',
            catlogCode:'',
            Domain:''
        };


        $scope.onLogout = function(){
            if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {
                projectRegService.logout();
            }
        };

        $scope.goToDashboard = function(){
            projectRegService.goToDashboard();
        };

        $scope.reverse=false;

        $scope.searchText=[false,false,false,false,false,false,false];

        $scope.visible=[true,true,true,true,true,true,true];


        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });



        $scope.order=function(predicate)
        {
            $scope.predicate=predicate;
            if($scope.predicate==predicate)
                $scope.reverse=false;
        };

        $scope.order1=function(predicate)
        {

            $scope.predicate=predicate;
            if($scope.predicate==predicate)
                $scope.reverse=true;

        };



        $scope.searchBox=function(index)
        {
            $scope.searchText[index]=true;
            $scope.visible[index]=false;

        };

        $scope.search1Box=function(index)
        {

            $scope.searchText[index]=false;
            $scope.visible[index]=true;
        };





        $scope.displaySave=true;
// $scope.sel_id="";


        $scope.getFeedbacks=function() {
            projectRegService.getFeedbacks()

                .success(function(data) {


                    $scope.datas = data;
                    console.log("ghj");

                    $scope.new = {
                        projectCode: '',
                        Title: '',
                        Department: '',
                        subHeads: '',
                        Software: '',
                        Hardware: '',
                        catlogCode: '',
                        Domain: ''

                    };


                })

                .error(function(error) {
                    //Showing error message
                    $scope.status = 'Unable to retrieve Feedbacks' + error;

                });



        };

        $scope.postData=function(){

            var data={projectCode:$scope.new.projectCode,
                Title:$scope.new.Title,
                Department:$scope.new.Department,
                subHeads:$scope.new.subHeads,
                Software:$scope.new.Software,
                Hardware:$scope.new.Hardware,
                catlogCode:$scope.new.catlogCode,
                Domain:$scope.new.Domain
            };


            projectRegService.postData(data)

                .success(function(data){
                    result=data;
                    alert("The Feedback Saved Successfully!!!");
                    $scope.getFeedbacks();



                }).
            error(function(error){
                alert("unable to save the feedback :" +err);
            });


        };


        $scope.editData=function(index){

            $scope.rowEdit=index;
//$scope.datas[index].edit=true;
            $scope.isEdit=false;



        };



        $scope.updateData = function(x,rowedit) {

            //$scope.editdata = false;
            //$scope.updatedata = true;


            $scope.datas[rowedit].projectCode=x.projectCode;
            $scope.datas[rowedit].Title=x.Title;
            $scope.datas[rowedit].Department=x.Department;
            $scope.datas[rowedit].subHeads=x.subHeads;
            $scope.datas[rowedit].Software=x.Software;
            $scope.datas[rowedit].Hardware=x.Hardware;
            $scope.datas[rowedit].catlogCode=x.catlogCode;
            $scope.datas[rowedit].Domain=x.Domain;
            $scope.datas[rowedit].editData=false;
            var data={
                projectCode : x.projectCode,
                Title : x.Title,
                Department : x.Department,
                subHeads : x.subHeads,
                Software : x.Software,
                Hardware : x.Hardware,
                catlogCode : x.catlogCode,
                Domain : x.Domain
            };

            projectRegService.updateData($scope.datas[$scope.rowEdit].id,data)

                .success(function(data) {


                    alert("The Feedback Updated Successfully!!!");

                    //$window.location.href='/';
                    $scope.rowEdit=-1;
                    $scope.getFeedbacks();

                    /*$scope.updatedata = false;
                     $scope.editdata = true;*/
                    $scope.isEdit=true;


                })
                .error(function(error) {

                    alert('Unable to update a Feedback: ' + error);
                });


        };


        $scope.deleteData=function(id)
        {
            var del={id:id};
            projectRegService.deleteData(id)


                .success(function(data){

                    alert('the data deleted successfully');
                    $scope.getFeedbacks();


                }).
            error(function(error){
                alert('unable to delete a feedback');
            });
        };

        $scope.getFeedbacks();
    }

    myApp.controller('projectRegController',projectRegController);
    // app.controller('MyController',MyController);

})();






