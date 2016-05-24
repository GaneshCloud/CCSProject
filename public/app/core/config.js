'use strict';

app.config(function($routeProvider, $locationProvider){

	$routeProvider.
		when("/project/home",{
			controller: "homeController",
			templateUrl: "../app/Home/home.html"
		}).
		// when("/", {
		// 	redirectTo:"/project/home"
		// }).
		when("/upload", {
			controller: "uploadController",
			controllerAs: "up",
			templateUrl: "../app/Upload/upload.html"		
		}).
		when("/error",{
			templateUrl: "../app/Error/error.html"		
		}).
		otherwise({
			redirectTo:"/error"
		});

	$locationProvider.html5Mode(true);
});