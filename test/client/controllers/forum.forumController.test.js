/**
 * Created by CSS on 13-06-2016.
 */

describe('#Forum Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService;
    var forumService;
    var $q;
    var deferred;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_forumService_,_dashboardService_,_$q_,$httpBackend) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        $q = _$q_;

        dashboardService = _dashboardService_;

        forumService = _forumService_;

        deferred = $q.defer();

        $controller('forumController', {
            $scope: scope
        });

        spyOn(forumService, 'postForumQuestion').and.returnValue(deferred.promise);
        spyOn(forumService, 'postAnswer').and.returnValue(deferred.promise);
        spyOn(forumService, 'getForumData').and.returnValue(deferred.promise);
        spyOn(forumService, 'postStar').and.returnValue(deferred.promise);
        spyOn(dashboardService, 'logout').and.returnValue(deferred.promise);
        spyOn(forumService, 'goToDashboard').and.returnValue(deferred.promise);
        $httpBackend.when("GET","/forum/getForum?type=All").respond("sample");
        $httpBackend.when("POST","/forum/postAnswer").respond("sample1");
    }));

    describe('#forum post Question', function () {
        it('post data', function () {
            scope.post={
                question:'',
                Explation:''
            };
            scope.selectedName='';
            scope.postForumQuestion();
            deferred.resolve({data:[{question:'hi',Type:'all',explation:'helo'}]});
            scope.$apply();
        });
    });

    describe('#forum post Answer', function () {
        it('post data', function () {
            scope.data = {
                qusId:'',
                Comment:''
            };
            scope.postAnswer();
            deferred.resolve({data:[{qusId:10,comment:'hi'}]});
            scope.$apply();
        });
    });

    describe('#forum Post Star ', function () {
        it('post Star Data', function () {
            qusId=1;
            star=2;
            scope.postStar(qusId,star);
            deferred.resolve({data:[{qusId:10,star:5}]});
            scope.$apply();
        });
    });


    describe('#get Question type ', function () {
        it('get category', function () {
            Type='All';
            scope.getForumData(Type);
            deferred.resolve({data:[{id:20,colspan:true}]});
            scope.$apply();

        });
    });

    describe('#Logout', function () {
        it('Logout Forum', function () {
            scope.onLogout();
            deferred.promise.then(function () {
                expect(dashboardService.logout).toHaveBeenCalled();
            });
        });
    });

    describe('#goToDashboard', function () {
        it('goToDashboard', function () {
            scope.goToDashboard();
            deferred.promise.then(function () {
                expect(forumService.goToDashboard).toHaveBeenCalled();
            });
        });
    });

    describe('#getType', function () {
        it('getType', function () {
            scope.Category='All';
            scope.getType();
            deferred.promise.then(function () {
                expect(forumService.getForum).toHaveBeenCalled();
            });
        });
    });

    describe('#check Star value and qusId ', function () {
        it('star rating', function () {
            qusId=1;
            value=2;
            var value=scope.toCheck(qusId,value);
            expect(value).toBeDefined();
        });
   });

    describe('#Alert', function () {
        it('Aler post Question', function () {

            scope.change();
            deferred.promise.then(function () {
                expect(forumService.change).toHaveBeenCalled();
            });
            scope.selectedName=["1","2"];
            scope.post={};
            scope.change();
            deferred.promise.then(function () {
                expect(forumService.change).toHaveBeenCalled();
            });
        });
    });

    describe('#search Filter', function () {
        it('Search Table Data ', function () {
            scope.sort();
            deferred.promise.then(function () {
                expect(forumService.sort).toHaveBeenCalled();
            });
        });
    });
    describe('#reset Filter', function () {
        it('reset filter data ', function () {
            scope.resetFilters();
            deferred.promise.then(function () {
                expect(forumService.resetFilters).toHaveBeenCalled();
            });
        });
    });

    describe('#$watch Search', function () {
        it('reset filter data ', function () {
            scope.search="we";
            scope.$apply();
        });
    });

    describe('#$watch Search', function () {
        it('reset filter data ', function () {
            scope.search=[];
            scope.$apply();
        });
    });
});