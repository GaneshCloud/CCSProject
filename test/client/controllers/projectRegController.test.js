describe('get data',function() {
    var $scope, $controller;
    var $q;
    var deferred, projectRegService;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _projectRegService_, $httpBackend) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        projectRegService = _projectRegService_;
        $controller = _$controller_;

        $controller('projectRegController', {
            $scope: $scope
        });

        $httpBackend.when('GET', '/getAllProjects').respond("sample");
        spyOn(projectRegService, 'getAllProjects').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'postNewProject').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'updateProject').and.returnValue(deferred.promise);
        spyOn(projectRegService, 'deleteProject').and.returnValue(deferred.promise);
    }));


    it("should receive a successful response", function () {

        spyOn(projectRegService, "goToDashboard");
        $scope.goToDashboard();
        expect(projectRegService.goToDashboard).toHaveBeenCalled();
    });

    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.order('projectCode');

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });

    it('check order', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.order1('projectCode');

        console.log(controller);

        expect($scope.reverse).toBeTruthy();

    });

    it('check searchBox', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.searchBox(1);

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });
    it('check search1Box', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.search1Box(1);

        console.log(controller);

        expect($scope.reverse).not.toBeTruthy();

    });

    it(' pagination ', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.rowEdit = 0;

        console.log(controller);

        $scope.showPagination(1);

        expect($scope.isedit).not.toBeTruthy();

    });

    it('hide the editing text boxes', function () {

        var $scope = {};

        var controller = $controller('projectRegController', {$scope: $scope});

        $scope.getAllProjects();

        console.log(controller);

        $scope.editProjectData(1);

        expect($scope.isedit).not.toBeTruthy();

    });


    it('should get the project', function () {

        $scope.getAllProjects();
        deferred.resolve({data:[{id: 16},{id:18}]});
        $scope.$apply();
    });


    it('should get projects undefined', function () {

        $scope.getAllProjects();
        deferred.reject();
        $scope.$apply();
    });

    it('should post the new project', function () {
        var x={PROJECT_CODE:'1',
                    TITLE:'7777',
                    DEPARTMENT:'dsg',
                    SUB_HEADS:'sdf',
                    SOFTWARE:'152',
                    HARDWARE:'2362',
                    CATLOG_CODE:'sdf',
                    DOMIAN:'sdfg'
                };
        $scope.postNewProject();
        deferred.resolve({data:[x]});
        $scope.$apply();
    });
    it('should post the new project undefined',function () {
        var x={PROJECT_CODE:'1',
            TITLE:'7777',
            DEPARTMENT:'dsg',
            SUB_HEADS:'sdf',
            SOFTWARE:'152',
            HARDWARE:'2362',
            CATLOG_CODE:'sdf',
            DOMIAN:'sdfg'
        };
        $scope.postNewProject();
        deferred.reject(x);
        $scope.$apply();
    });

    it('Update the project', function () {

        var y={PROJECT_CODE:'1',
            TITLE:'7777',
            DEPARTMENT:'dsg',
            SUB_HEADS:'sdf',
            SOFTWARE:'152',
            HARDWARE:'2362',
            CATLOG_CODE:'sdf',
            DOMIAN:'sdfg',
            id:0
        };

        $scope.dataFilter=[y]
        $scope.updateProject(y,0);

        deferred.resolve({data:[y]});
        $scope.$apply();
    });
    it('update the project undefined', function () {

        var y={PROJECT_CODE:'1',
            TITLE:'7777',
            DEPARTMENT:'dsg',
            SUB_HEADS:'sdf',
            SOFTWARE:'152',
            HARDWARE:'2362',
            CATLOG_CODE:'sdf',
            DOMIAN:'sdfg',
            id:0
        };

        $scope.dataFilter=[y]
        $scope.updateProject(y,0);

        deferred.reject();
        $scope.$apply();
    });

    it('Delete the project', function () {

        $scope.deleteProject(16);
        deferred.resolve({data:[{id: 16}]});
        $scope.$apply();
    });
    it('Delete the project undefined', function () {

        $scope.deleteProject(16);
        deferred.reject({id: 16});
        $scope.$apply();
    });



});

