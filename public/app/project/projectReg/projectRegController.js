(function() {
    angular.module('myApp')
        .controller('projectRegController', projectRegController);

    projectRegController.$inject=[
        '$scope',
        '$window',
        'projectRegService',
        'dashboardService'
    ];

    function projectRegController($scope,$window,projectRegService,dashboardService) {

        $scope.names = ['mechanical', 'mechatronics', 'ECE', 'CS', 'IT'];
        $scope.Title = ['Mechanical Projects', 'Aeronatical Projects', 'ECE Projects', 'Embaded projects', 'IT Projects'];
        $scope.subHeads = ['CEA-ATMEL', 'CEA-OTHERS', 'CEC-PC BASED', 'CEA-DSP PROJECTS', 'IEEE PAPERS'];
        $scope.catlogCode = ['CIS-C# NET PROJECTS', 'CDB BIO MEDICAL PROJECTS', 'C,C++ AND VC++ PROJECTS', 'CAD/CAM/CAE PROJECTS', 'CIVIL DESIGN PROJECTS'];
        $scope.Domain = ['RFID', 'ROBOTICS', 'BIOMEDICAL PROJECTS', 'C,C++ AND VC++ PROJECTS', 'CIVIL DESIGN Projects'];
        // $scope.asc=false;

        $scope.isEdit = true;

        $scope.noData = true;

        $scope.cur_page = 1;

        $scope.datas = [];

        $scope.dataFilter = [];

        $scope.items_per_page = 10;

        $scope.totalLength = 0;

        $scope.max_size = Math.ceil($scope.userDetails / $scope.items_per_page);

        $scope.new = {projectCode: '',
            Title: '',
            Department: '',
            subHeads: '',
            Software: '',
            Hardware: '',
            catlogCode: '',
            Domain: ''
        };

        $scope.showPagination = function() {
            return $scope.noData;
        };

        $scope.onLogout = function() {
            if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
                dashboardService.logout();
            }
        };

        $scope.goToDashboard = function() {
            projectRegService.goToDashboard();
        };

        $scope.reverse = false;

        $scope.searchText = [false,false,false,false,false,false,false];

        $scope.visible = [true,true,true,true,true,true,true];


        // $(document).ready(function() {
        //     $('[data-toggle="tooltip"]').tooltip();
        // });



        $scope.order = function(predicate)    {
            $scope.predicate = predicate;
            if ($scope.predicate === predicate)
                $scope.reverse = false;
        };

        $scope.order1 = function(predicate)    {

            $scope.predicate = predicate;
            if ($scope.predicate === predicate)
                $scope.reverse = true;

        };



        $scope.searchBox = function(index)    {
            $scope.searchText[index] = true;
            $scope.visible[index] = false;

        };

        $scope.search1Box = function(index)    {

            $scope.searchText[index] = false;
            $scope.visible[index] = true;
        };





        $scope.displaySave = true;
        // $scope.sel_id="";


        $scope.getFeedbacks = function() {
            projectRegService.getFeedbacks()

                .then(function(data) {

                    $scope.datas = data;

                    if ($scope.datas.length > 0) {

                        $scope.noData = false;

                        $scope.totalLength = $scope.datas.length;

                        $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);

                        $scope.$watch('cur_page + items_per_page', function() {

                            var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
                            console.log(begin + ' ' + end);
                            $scope.dataFilter = $scope.datas.slice(begin, end);
                            // Alert("data"+$scope.searches);
                        });
                    }

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

                .catch(function(error) {
                    //Showing error message
                    $scope.status = 'Unable to retrieve Feedbacks' + error;

                });



        };

        $scope.postData = function() {

            var data = {projectCode: $scope.new.projectCode,
                Title: $scope.new.Title,
                Department: $scope.new.Department,
                subHeads: $scope.new.subHeads,
                Software: $scope.new.Software,
                Hardware: $scope.new.Hardware,
                catlogCode: $scope.new.catlogCode,
                Domain: $scope.new.Domain
            };


            projectRegService.postData(data)
                .then(function(data) {
                alert('The Feedback Saved Successfully!!!' + data);
                $scope.getFeedbacks();
            }).
            catch(function(error) {
                alert('unable to save the feedback :' + error);
            });


        };


        $scope.editData = function(index) {

            $scope.rowEdit = index;
            //$scope.datas[index].edit=true;
            $scope.isEdit = false;



        };



        $scope.updateData = function(x,rowedit) {

            //$scope.editdata = false;
            //$scope.updatedata = true;


            $scope.dataFilter[rowedit].projectCode = x.projectCode;
            $scope.dataFilter[rowedit].Title = x.Title;
            $scope.dataFilter[rowedit].Department = x.Department;
            $scope.dataFilter[rowedit].subHeads = x.subHeads;
            $scope.dataFilter[rowedit].Software = x.Software;
            $scope.dataFilter[rowedit].Hardware = x.Hardware;
            $scope.dataFilter[rowedit].catlogCode = x.catlogCode;
            $scope.dataFilter[rowedit].Domain = x.Domain;
            $scope.dataFilter[rowedit].editData = false;
            var data = {
                projectCode: x.projectCode,
                Title: x.Title,
                Department: x.Department,
                subHeads: x.subHeads,
                Software: x.Software,
                Hardware: x.Hardware,
                catlogCode: x.catlogCode,
                Domain: x.Domain,
                //id: $scope.dataFilter[$scope.rowEdit].id
            };

            projectRegService.updateData(data)

                .then(function(data) {


                    alert('The Feedback Updated Successfully!!!' + data);

                    //$window.location.href='/';
                    $scope.rowEdit = -1;
                    //$scope.getFeedbacks();

                    /*$scope.updatedata = false;
                     $scope.editdata = true;*/
                    $scope.isEdit = true;


                })
                .catch(function(error) {

                    alert('Unable to update a Feedback: ' + error);
                });


        };


        $scope.deleteData = function(id)    {
            // Var del = {id: id};
            projectRegService.deleteData(id)


                .then(function(data) {

                    alert('the data deleted successfully' + data);
                    $scope.getFeedbacks();


                }).
            catch(function(error) {
                alert('unable to delete a feedback' + error);
            });
        };

        $scope.getFeedbacks();
    }
})();







