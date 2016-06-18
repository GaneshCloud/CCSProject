
describe('#Project Home Controller', function () {

    beforeEach(module('myApp'));

    beforeEach(inject(function ($rootScope, $controller,_homeService_,_dashboardService_,_$q_,$httpBackend) {
        //$location = _$location_;
        scope = $rootScope.$new();
        homeService=_homeService_;
        dashboardService=_dashboardService_;
        deferred = _$q_.defer();
        
        homeController = function() {
            return $controller('homeController', {
                '$scope': scope
            });
        };

        $httpBackend.when('GET', '/data').respond("sample");
        $httpBackend.when('GET', '/projectHistory').respond("sample");
        $httpBackend.when('GET', '/chartData').respond("sample");
        $httpBackend.when('GET', '/imageData').respond("sample");

        spyOn(dashboardService, 'checkAdmin').and.returnValue(deferred.promise);
        spyOn(homeService, 'projectData').and.returnValue(deferred.promise);
        spyOn(homeService, 'projectHistory').and.returnValue(deferred.promise);
        spyOn(homeService, 'chartData').and.returnValue(deferred.promise);
        spyOn(homeService, 'imageData').and.returnValue(deferred.promise);
        spyOn(homeService, 'postQuestion').and.returnValue(deferred.promise);

    }));

    describe('#Initialize homeController', function () {
        it('Should Initialize homeController', function () {
            var controller = homeController();
            expect(controller).toBeDefined();
        });
    });

    describe('#User type', function () {
        it('#Should check user type in before see the project page', function () {
            var controller = homeController();
            expect(dashboardService.checkAdmin).toBeDefined();
            expect(dashboardService.checkAdmin).toHaveBeenCalled();
        });
    });

    describe('#Function Definition in homeController', function(){
        // it('#Should check projectData() to be defined or not', function(){
        //     var controller=homeController();
        //     expect(scope.projectData).toBeDefined();
        //     expect(scope.projectHistory).toBeDefined();
        //     expect(scope.chartData).toBeDefined();
        //     expect(scope.imageData).toBeDefined();
        //     expect(scope.postData).toBeDefined();
        //     expect(scope.onLogout).toBeDefined();
        //     expect(scope.goToDashboard).toBeDefined();
        // });

        it('#Should check projectData() to be defined or not', function(){
            var controller=homeController();
            expect(scope.projectData).toBeDefined();
        });

        it('#Should check projectHistory() to be defined or not', function(){
            var controller=homeController();
            expect(scope.projectHistory).toBeDefined();
        });

        it('#Should check chartData() to be defined or not', function(){
            var controller=homeController();
            expect(scope.chartData).toBeDefined();
        });

        it('#Should check imageData() to be defined or not', function(){
            var controller=homeController();
            expect(scope.imageData).toBeDefined();
        });

        it('#Should check postData() to be defined or not', function(){
            var controller=homeController();
            expect(scope.postData).toBeDefined();
        });

        it('#Should check onLogout() to be defined or not', function(){
            var controller=homeController();
            expect(scope.onLogout).toBeDefined();
        });

        it('#Should check goToDashboard() to be defined or not', function(){
            var controller=homeController();
            expect(scope.goToDashboard).toBeDefined();
        });
    });

    describe('#Function Definition in homeService', function(){
       // it('#Should check all functions are defined in homeService', function(){
       //     var controller=homeController();
       //     expect(homeService.projectData).toBeDefined();
       //     expect(homeService.projectHistory).toBeDefined();
       //     expect(homeService.chartData).toBeDefined();
       //     expect(homeService.imageData).toBeDefined();
       //     expect(homeService.postQuestion).toBeDefined();
       //     expect(dashboardService.logout).toBeDefined();
       //     expect(homeService.goToDashboard).toBeDefined();
       // });

        it('#Should check projectData() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.projectData).toBeDefined();
        });

        it('#Should check projectHistory() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.projectHistory).toBeDefined();
        });

        it('#Should check chartData() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.chartData).toBeDefined();
        });

        it('#Should check imageData() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.imageData).toBeDefined();
        });

        it('#Should check postQuestion() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.postQuestion).toBeDefined();
        });

        it('#Should check onLogout() to be defined or not', function(){
            var controller=homeController();
            expect(dashboardService.logout).toBeDefined();
        });

        it('#Should check goToDashboard() to be defined or not', function(){
            var controller=homeController();
            expect(homeService.goToDashboard).toBeDefined();
        });
    });

    describe('#Get Data when project page load', function(){

        it('#Should check get project data', function () {
            var controller = homeController();
            scope.projectData();
            //expect(scope.datas).not.toBeNull();
            // scope.projectData();
            deferred.resolve({data:[{id:2,name:'abc'},{id:3,name:'abc'}]});
            scope.$apply();
        });
        it('#Should check get project data', function () {
            var controller = homeController();
             scope.projectData();
             //expect(scope.datas).not.toBeNull();
            // scope.projectData();
            deferred.reject();
            scope.$apply();
        });

        it('#Should check get project history', function () {
            var controller = homeController();
            scope.projectHistory();
            deferred.resolve({data:[{id:2,name:'abc'},{id:3,name:'abc'}]});
            scope.$apply();
            // expect(scope.events).not.toBeNull();
        });

        it('#Should check get project history', function () {
            var controller = homeController();
            scope.projectHistory();
            deferred.reject();
            scope.$apply();
           // expect(scope.events).not.toBeNull();
        });

        it('#Should check get image data', function () {
            var controller = homeController();
            scope.imageData();
            deferred.resolve({data:[{id:2,name:'abc'},{id:3,name:'abc'}]});
            scope.$apply();
            expect(scope.images).not.toBeNull();
        });

        it('#Should check get image data', function () {
            var controller = homeController();
            scope.imageData();
            deferred.reject();
            scope.$apply();
            expect(scope.images).not.toBeNull();
        });

        it('#Should check get chart data', function () {
            var controller = homeController();
            scope.chartData();
            deferred.resolve({data:[{id:2,name:'abc'},{id:3,name:'abc'}]});
            scope.$apply();
            //expect(scope.myDataSource).not.toBeNull();
            // expect(scope.totalPercentage ).not.toBeNull();
        });

        it('#Should check get chart data', function () {
            var controller = homeController();
            scope.chartData();
            deferred.reject();
            scope.$apply();
            //expect(scope.myDataSource).not.toBeNull();
           // expect(scope.totalPercentage ).not.toBeNull();
        });
    });

    describe('#Post data when post queries or changes in project', function () {

        it('post question with success data', function () {
            var controller = homeController();
            scope.question='What is Angular?';
            scope.postData();
            deferred.resolve({data:[{id:2,name:'abc'},{id:3,name:'abc'}]});
            scope.$apply();
            //expect(scope.question.length).toBe(0);
            //expect(scope.question).toBeFalsy();
        });

        it('post question with failure data', function () {
            var controller = homeController();
            //scope.question='';
            scope.postData();
            deferred.reject();
            scope.$apply();
             //expect(scope.question.length).toBe(0);
             //expect(scope.question).toBeFalsy();
        });
    });

    describe('#Go to dashboard', function(){
        it("should check goToDashboard function call", function () {
            var controller = homeController();
            spyOn(homeService, "goToDashboard");
            scope.goToDashboard();
            expect(homeService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
        });
    });

    describe('#Logout', function() {
        it("should check logout function call", function () {
            var controller = homeController();
            spyOn(dashboardService, "logout");
            scope.onLogout ();
            expect(dashboardService.logout).toHaveBeenCalled();  //Verifies this was calle
        });
    });

});