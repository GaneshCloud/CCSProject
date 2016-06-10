/**
 * Created by Administrator on 6/9/2016.
 */
/**
 * Created by Administrator on 6/9/2016.
 */
describe('single File Upload Controller', function () {
    beforeEach(module('myApp'));
    var $controller,controller,$scope={},viewDocumentServices,deferred;
    beforeEach(inject(function(_$controller_,_viewDocumentServices_,$q){
        $controller = _$controller_;
        viewDocumentServices=_viewDocumentServices_;
        controller = $controller('viewDocumentController', { $scope: $scope });
        deferred = $q.defer();
        spyOn(viewDocumentServices, "Download").and.returnValue(deferred.promise);

        deferred.resolve();
        

    }));

    it("delete message notification is called", function() {
        $scope.Download();
         expect(viewDocumentServices.Download).toHaveBeenCalledWith({ID:0});
    })

});