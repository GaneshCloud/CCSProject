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


        var isEdit = true;

        var noData = true;

        $scope.cur_page = 1;

        $scope.datas = [];

        $scope.dataFilter = [];

        $scope.items_per_page = 10;

        $scope.totalLength = 0;

        $scope.max_size = Math.ceil($scope.userDetails / $scope.items_per_page);

        $scope.new = {projectCode: '',
            title: '',
            department: '',
            subHeads: '',
            software: '',
            hardware: '',
            catlogCode: '',
            domain: ''
        };

        $scope.showPagination = function() {
            return noData;
        };

        $scope.goToDashboard = function() {
            projectRegService.goToDashboard();
        };

        $scope.reverse = false;

        $scope.searchText = [false,false,false,false,false,false,false];

        $scope.visible = [true,true,true,true,true,true,true];

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

        $scope.getAllProjects = function() {
            projectRegService.getAllProjects()

                .then(function(response) {

                    $scope.datas = response.data;

                    if ($scope.datas.length > 0) {

                        noData = false;

                        $scope.totalLength = $scope.datas.length;

                        $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);

                        $scope.$watch('cur_page + items_per_page', function() {

                            var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
                            console.log(begin + ' ' + end);
                            $scope.dataFilter = $scope.datas.slice(begin, end);

                        });
                    }

                    $scope.new = {
                        PROJECT_CODE: '',
                        TITLE: '',
                        DEPARTMENT: '',
                        SUB_HEADS: '',
                        SOFTWARE: '',
                        HARDWARE: '',
                        CATELOG_CODE: '',
                        DOMAIN: ''

                    };


                })

                .catch(function(error) {
                    //Showing error message
                    $scope.status = 'Unable To Retrieve The Project Details' + error;

                });



        };

        $scope.postNewProject = function() {

            var data = {PROJECT_CODE: $scope.new.PROJECT_CODE,
                TITLE: $scope.new.TITLE,
                DEPARTMENT: $scope.new.DEPARTMENT,
                SUB_HEADS: $scope.new.SUB_HEADS,
                SOFTWARE: $scope.new.SOFTWARE,
                HARDWARE: $scope.new.HARDWARE,
                CATELOG_CODE: $scope.new.CATELOG_CODE,
                DOMAIN: $scope.new.DOMAIN
            };


            projectRegService.postNewProject(data)
                .then(function(data) {
                alert('New Project Added Successfully!!!');
                $scope.getAllProjects();
            }).
            catch(function(error) {
                alert('Unable To The Project :' + error);
            });
        };

        $scope.editProjectData = function(index) {
            $scope.rowEdit = index;
            isEdit = false;

        };



        $scope.updateProject = function(x,rowedit) {

            $scope.dataFilter[rowedit].PROJECT_CODE = x.PROJECT_CODE;
            $scope.dataFilter[rowedit].TITLE = x.TITLE;
            $scope.dataFilter[rowedit].DEPARTMENT = x.DEPARTMENT;
            $scope.dataFilter[rowedit].SUB_HEADS = x.SUB_HEADS;
            $scope.dataFilter[rowedit].SOFTWARE = x.SOFTWARE;
            $scope.dataFilter[rowedit].HARDWARE = x.HARDWARE;
            $scope.dataFilter[rowedit].CATELOG_CODE = x.CATELOG_CODE;
            $scope.dataFilter[rowedit].DOMAIN = x.DOMAIN;
            $scope.dataFilter[rowedit].editProjectData = false;
            console.log($scope.dataFilter);
            console.log($scope.rowEdit);
            var data = {
                PROJECT_CODE: x.PROJECT_CODE,
                TITLE: x.TITLE,
                DEPARTMENT: x.DEPARTMENT,
                SUB_HEADS: x.SUB_HEADS,
                SOFTWARE: x.SOFTWARE,
                HARDWARE: x.HARDWARE,
                CATELOG_CODE: x.CATELOG_CODE,
                DOMAIN: x.DOMAIN,
                id: $scope.dataFilter[rowedit].id
            };

            projectRegService.updateProject(data)

                .then(function(response) {
                    alert('The Project Updated Successfully!!!');
                    $scope.rowEdit = -1;
                    $scope.getAllProjects();
                    $scope.isEdit = true;
                })
                .catch(function(error) {
                    alert('Unable to Update The Project: ' + error);
                });
        };

        $scope.deleteProject = function(id)    {
            projectRegService.deleteProject(id)
                .then(function(data) {
                    alert('The Selected Project deleted successfully');
                    $scope.getAllProjects();
                }).
            catch(function(error) {
                alert('Unable To Delete The Project' + error);
            });
        };
        $scope.getAllProjects();
    }
})();







