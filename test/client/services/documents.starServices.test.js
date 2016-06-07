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
        $factory=$injector.get("starServices");
    }));

    it('testing api call',function () {
        var res=$factory.getStarInfo(196);
        console.log("info"+JSON.stringify(res));
    });

    it('testing api call',function () {
        var res=$factory.setStar({DOC_ID:196,STR:3,USER_ID:2});
        console.log("info"+JSON.stringify(res));
    });

    it('testing api call',function () {
        var res=$factory.getStar(196);
        console.log("info"+JSON.stringify(res));
    });

});
