/**
 * Created by Administrator on 21.06.2016.
 */
/**
 * Created by Administrator on 6/1/2016.
 */

/**
 * Created by Administrator on 6/1/2016.
 */

describe('Star Services', function () {

    var $controller,$factory;
    beforeEach(module('myApp'));



    beforeEach(inject(function($injector){
        $factory=$injector.get("departmentServices");
    }));

    describe('get department', function () {
        it('department function', inject(function ($httpBackend) {

            $httpBackend
                .when('GET','/api/dep')
                .respond(200);
            var res = $factory.getDepartment();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('department function invalid url', inject(function ($httpBackend) {

            $httpBackend
                .when('GET','/api/department')
                .respond(200);
            var res = $factory.getDepartment();
            expect($httpBackend.flush).toThrow();

        }));
    });

});
