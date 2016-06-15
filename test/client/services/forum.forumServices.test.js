describe('forumService',function(){


    var $controller,$factory,windowObj;
    beforeEach(module('myApp'));
    beforeEach(module(function($provide){
        windowObj = {location: {href: ''}};
        $provide.value('$window',windowObj);
    }));
    beforeEach(inject(function($injector,$httpBackend){
        $factory=$injector.get("forumService");

    }));

    describe('get the data',function(){
        it('get data function',inject(function($httpBackend){
            $httpBackend
                .when('GET','/forum/getForum?type=All')
                .respond(200);
            var res=$factory.getForumData('All');
            expect($httpBackend.flush).not.toThrow();

        }));

        it('get data invalid url function',inject(function($httpBackend){
            $httpBackend
                .when('R','/forum/getForum?type=All1')
                .respond(200);
            var res=$factory.getForumData('All');
            expect($httpBackend.flush).toThrow();

        }));

    });

    describe('post data',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/forum/postForumquestion')
                .respond(200);
            var res=$factory.postForumQuestion();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('post data invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('g','/forum/postForumquestion1')
                .respond(500);
            var res=$factory.postForumQuestion();
            expect($httpBackend.flush).toThrow();
        })) ;

    });

    describe('post Rating',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/forum/rating')
                .respond(200);
            var res=$factory.postStar();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('post Rating invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('g','/forum/rating1')
                .respond(500);
            var res=$factory.postStar();
            expect($httpBackend.flush).toThrow();
        })) ;

    });


    describe('post Answer',function(){
        it('post data function',inject(function($httpBackend){

            $httpBackend
                .when('POST','/forum/postAnswer')
                .respond(200);
            var res=$factory.postAnswer();
            expect($httpBackend.flush).not.toThrow();
        })) ;

        it('post Answer invalid url function',inject(function($httpBackend){

            $httpBackend
                .when('P','/forum/postAnswer1')
                .respond(500);
            var res=$factory.postAnswer();
            expect($httpBackend.flush).toThrow();
        })) ;

    });

    describe("logout forum",function () {
        it('href redirects', function() {
            $factory.goToDashboard();
            expect(windowObj.location.href).toEqual('/profile/dashboard');
        });
    });


});