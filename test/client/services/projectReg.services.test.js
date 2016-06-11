describe('projectReg service',function(){

    var $controller,$factory,windowObj;
    beforeEach(module(function($provide) {
        windowObj = {location: {href: ''}};
        $provide.value('$window', windowObj);
    }));

    beforeEach(module('myApp'));
    module(function($provide){
        $provide.value('$window',$window);
    });
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("projectRegService");

    }));

    describe('get the data',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getdata')
                .respond(200);
            var res=$factory.getFeedbacks();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getdata12')
                .respond(200);
            var res=$factory.getFeedbacks();
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('post data',function(){
       it('post data function',inject(function($httpBackend){

           $httpBackend
               .when('POST','/postdata')
               .respond(200);
           var res=$factory.postData();
           expect($httpBackend.flush).not.toThrow();
       })) ;

        it('post data invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/postdata34')
                .respond(200);
            var res=$factory.postData();
            expect($httpBackend.flush).toThrow();
        })) ;

    });

    describe('update data',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('PUT','/editdata')
                .respond(200);
            var res=$factory.updateData();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('update data invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('PUT','/editdata45')
                .respond(200);
            var res=$factory.updateData();
            expect($httpBackend.flush).toThrow();
        })) ;

    });

    describe('delete data',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('DELETE','/deletedata/16')
                .respond(200);
            var res=$factory.deleteData(16);
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('delete data invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('DELETE','/deletedata12/100')
                .respond(200);
            var res=$factory.deleteData(100);
            expect($httpBackend.flush).toThrow();
        })) ;

    });


    describe("logout service",function () {

        it('href redirects', function() {
           $factory.logout();
            expect($window.location.href).toEqual('/logout');
        });
    });

    describe("dashboard service",function () {

        it('href redirects', function() {
            $factory.goToDashboard();
            expect($window.location.href).toEqual('/profile/adminDashboard');
        });
    });


    



});