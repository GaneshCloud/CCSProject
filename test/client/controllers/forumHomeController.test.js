
describe('forumController', function () {

    beforeEach(module('myApp'));

    var $controller, $factory, mockServiceA,$rootScope,$q;

    beforeEach(inject(function (_$controller_,_$rootScope_,_forumService_,$q) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        forumServices=_forumService_;
        deferred = $q.defer();

    }));
    
        it('Post Questions', function () {
            var $scope = $rootScope.$new();
            var controller = $controller('forumController', {$scope: $scope});
            $scope.post = {};
            $scope.post.question = 'hi';
            $scope.selectedName = 'General';
            $scope.post.Explation = 'helo';
            spyOn(forumServices, 'postForumquestion');
        //     $scope.postForumquestion();
               deferred.promise.then(function postForumquestion() {

               expect(forumServices.postForumquestion).toHaveBeenCalled();

               });
         });
    });
// describe('how to test with promises', function () {
//     var deferred;
//
//     beforeEach(function () {
//         inject(function ($q) {
//             deferred = $q.defer();
//         });
//     });
//
//     it('does a thing one way', function () {
//         deferred.promise.then(function (value) {
//             expect(value).toBe(4);
//         });
//         deferred.resolve(10);
//     });
//
//     it('does a thing another way', function () {
//         var handler = jasmine.createSpy('success');
//         deferred.promise.then(handler);
//         deferred.resolve(10);
//         expect(handler).toHaveBeenCalledWith(4);
//     });
// });