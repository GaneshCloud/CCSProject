'use strict';

app.config(function($routeProvider, $locationProvider){

	$routeProvider.
		when("/project/home",{
			controller: "homeController",
			templateUrl: "../app/project/home/home.html"
		}).
		// when("/", {
		// 	redirectTo:"/project/home"
		// }).
		when("/project/upload", {
			controller: "uploadController",
			controllerAs: "up",
			templateUrl: "../app/project/upload/upload.html"
		}).
		when("/error",{
			templateUrl: "../app/Error/error.html"		
		}).
		otherwise({
			redirectTo:"/error"
		});

	$locationProvider.html5Mode(true);
});