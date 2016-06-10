describe('Project Home service',function(){

    var $controller,$factory,windowObj;

    beforeEach(module(function($provide) {
        windowObj = {location: {href: ''}};
        $provide.value('$window', windowObj);
    }));

    beforeEach(module('myApp'));

    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("homeService");
    }));

    it('Should Initialize homeService', function () {
        expect($factory).toBeDefined();
    });

    describe('get the project data',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/projectData')
                .respond(200);
            var res=$factory.projectData();
            expect($httpBackend.flush).toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/data12')
                .respond(200);
            var res=$factory.projectData();
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('get the Project History',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/projectHistory')
                .respond(200);
            var res=$factory.projectHistory();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/projectHistor')
                .respond(200);
            var res=$factory.projectHistory();
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('get the Chart Data',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/chartData')
                .respond(200);
            var res=$factory.chartData();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/chartata')
                .respond(200);
            var res=$factory.chartData();
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('get the Image Data',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/imageData')
                .respond(200);
            var res=$factory.imageData();
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/imageDatas')
                .respond(200);
            var res=$factory.imageData();
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('post data',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/postQuestion')
                .respond(200);
            var res=$factory.postQuestion();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('post data invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/posQuestion')
                .respond(200);
            var res=$factory.postQuestion();
            expect($httpBackend.flush).toThrow();
        })) ;
    });


    describe("logout docmnwet",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        });
    });
});