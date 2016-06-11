
describe('#Project Home Controller', function () {

    beforeEach(module('myApp'));

    beforeEach(inject(function ($rootScope, $controller,_homeService_,_$q_) {
        //$location = _$location_;
        scope = $rootScope.$new();
        homeService=_homeService_;
        $q=_$q_;

        homeController = function() {
            return $controller('homeController', {
                '$scope': scope
            });
        };
    }));

    describe('#Initialize homeController', function () {
        it('Should Initialize homeController', function () {
            var controller = homeController();
            expect(controller).toBeDefined();
        });
    });



    describe('#Function definition in homeService', function () {
        it("should check projectData() to be defined", function () {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function (data) {
                }
            };
            spyOn(homeService, "projectData");
            expect(homeService.projectData).toBeDefined();  //Verifies this was called
        });

        it("should check projectHistory() to be defined", function () {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function (data) {
                }
            };
            spyOn(homeService, "projectHistory");
            expect(homeService.projectHistory).toBeDefined();  //Verifies this was called
        });

        it("should check chartData() to be defined", function () {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function (data) {
                }
            };
            spyOn(homeService, "chartData");
            expect(homeService.chartData).toBeDefined();  //Verifies this was called
        });

        it("should check imageData() to be defined", function () {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function (data) {
                }
            };
            spyOn(homeService, "imageData");
            expect(homeService.imageData).toBeDefined();  //Verifies this was called
        });
        it("should check postQuestion() to be defined", function () {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function (data) {
                }
            };
            spyOn(homeService, "postQuestion");
            expect(homeService.postQuestion).toBeDefined();  //Verifies this was called
        });
    });
    describe('#Function definition in homeService', function () {
        it("should receive a successful response", function() {
            var controller = homeController();
            var fakeHttpPromise = {
                then: function(data) {
                }
            };
            spyOn(homeService, "projectData").and.callFake(function() {
                return  fakeHttpPromise
            });
            scope.projectData();
            expect(homeService.projectData).toHaveBeenCalled();  //Verifies this was called
            expect(scope.datas).not.toBeNull();
        });

        it('check get project data', function () {
            var controller = homeController();
            scope.projectData();
            expect(scope.datas).not.toBeNull();
        });


        it('check get project history', function () {
            var controller = homeController();
            scope.projectHistory();
            expect(scope.events).not.toBeNull();
        });

        // it('check after get project history',function(){
        //    var controller=homeController();
        //     var events=''
        //     scope.projectHistory();
        //     expect(scope.events.length).toBeGreaterThan(0);
        // });

        it('check get image data', function () {
            var controller = homeController();
            scope.imageData();
            expect(scope.images).not.toBeNull();
        });

        it('check get chart data', function () {
            var controller = homeController();
            scope.chartData();
            expect(scope.myDataSource).not.toBeNull();
            expect(scope.totalPercentage ).not.toBeNull();
        });
    });

    describe('#data when post queries or changes in project', function () {
        it('post question with empty data', function () {
            var controller = homeController();
            scope.postData();
            expect(scope.question).not.toBeNull();
        });

        it('post question with empty data', function () {
            var controller = homeController();
            scope.question='';
            scope.postData();
            expect(scope.question.length).toBe(0);
            expect(scope.question).toBeFalsy();
        });

        it('post question with valid', function () {
            var controller = homeController();
            scope.question='What is Angular?';
            scope.postData();
            expect(scope.question.length).toBeGreaterThan(0);
            expect(scope.question).toBeTruthy();
        });

        it('post question with null or undefined', function () {
            var controller = homeController();
            scope.question=null;
            scope.postData();
            expect(scope.question).toBeNull();
            expect(scope.question).toBeFalsy();
        });

        it('post question with null or undefined', function () {
            var controller = homeController();
            scope.question=undefined;
            scope.postData();
            expect(scope.question).not.toBeDefined();
            expect(scope.question).toBeFalsy();
        });
    });

});