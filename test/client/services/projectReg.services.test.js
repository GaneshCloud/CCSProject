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

    describe('get the project',function(){
        it('get project function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getAllProjects')
                .respond(200);
            var res=$factory.getAllProjects();
            expect($httpBackend.flush).not.toThrow();
        }));

        it('get project invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/getAllProjects1')
                .respond(200);
            var res=$factory.getAllProjects();
            expect($httpBackend.flush).toThrow();
        }));
    });

    describe('post project',function(){
       it('post project function',inject(function($httpBackend){
           $httpBackend
               .when('POST','/postNewProject')
               .respond(200);
           var res=$factory.postNewProject();
           expect($httpBackend.flush).not.toThrow();
       })) ;

        it('post project invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('POST','/postNewProject1')
                .respond(200);
            var res=$factory.postNewProject();
            expect($httpBackend.flush).toThrow();
        })) ;
    });

    describe('update project',function(){
        it('post data function',inject(function($httpBackend){
            $httpBackend
                .when('POST','/updateProject')
                .respond(200);
            var res=$factory.updateProject();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('update project invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('POST','/updateProject1')
                .respond(200);
            var res=$factory.updateProject();
            expect($httpBackend.flush).toThrow();
        })) ;

    });

    describe('delete project',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/deleteProject')
                .respond(200);
            var res=$factory.deleteProject(16);
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('delete project invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('POST','/deleteProject12/100')
                .respond(200);
            var res=$factory.deleteProject(100);
            expect($httpBackend.flush).toThrow();
        })) ;
    });

    describe("dashboard service",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).not.toEqual('/profile/adminDashboard');
        });
    });
});