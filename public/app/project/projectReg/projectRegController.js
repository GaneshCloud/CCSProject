(function() {
    angular.module('myApp')
        .controller('projectRegController', projectRegController);

    projectRegController.$inject=[
        '$scope',
        '$window',
        'projectRegService',
        'dashboardService',
        'DEPARTMENTS',
        'TITLE',
        'SUB_HEADS',
        'CATELOG_CODE',
        'DOMAIN'

    ];

    function projectRegController($scope,$window,projectRegService,dashboardService,DEPARTMENTS,TITLE,SUB_HEADS,CATELOG_CODE,DOMAIN) {

        $scope.departments = DEPARTMENTS;
        $scope.Title = TITLE;
        $scope.subHeads = SUB_HEADS;
        $scope.catlogCode = CATELOG_CODE;
        $scope.Domain = DOMAIN;


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
                        projectCode: '',
                        title: '',
                        department: '',
                        subHeads: '',
                        software: '',
                        hardware: '',
                        catlogCode: '',
                        domain: ''

                    };


                })

                .catch(function(error) {
                    //Showing error message
                    $scope.status = 'Unable To Retrieve The Project Details' + error;

                });



        };

        $scope.postNewProject = function() {

            var data = {projectCode: $scope.new.projectCode,
                title: $scope.new.title,
                department: $scope.new.department,
                subHeads: $scope.new.subHeads,
                software: $scope.new.software,
                hardware: $scope.new.hardware,
                catlogCode: $scope.new.catlogCode,
                domain: $scope.new.domain
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

            $scope.dataFilter[rowedit].projectCode = x.projectCode;
            $scope.dataFilter[rowedit].title = x.title;
            $scope.dataFilter[rowedit].department = x.department;
            $scope.dataFilter[rowedit].subHeads = x.subHeads;
            $scope.dataFilter[rowedit].software = x.software;
            $scope.dataFilter[rowedit].hardware = x.hardware;
            $scope.dataFilter[rowedit].catlogCode = x.catlogCode;
            $scope.dataFilter[rowedit].domain = x.domain;
            $scope.dataFilter[rowedit].editProjectData = false;
            console.log($scope.dataFilter);
            console.log($scope.rowEdit);
            var data = {
                projectCode: x.projectCode,
                title: x.title,
                department: x.department,
                subHeads: x.subHeads,
                software: x.software,
                hardware: x.hardware,
                catlogCode: x.catlogCode,
                domain: x.domain,
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







