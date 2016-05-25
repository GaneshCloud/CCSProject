'use strict';

myApp.config(function($routeProvider, $locationProvider){

	$routeProvider.
		when("/project/home",{
			controller: "homeController",
			templateUrl: "../app/project/home/home.html"
		}).
		when("/", {
			controller: "loginController",
			templateUrl:"../app/profile/login/login.html"
		}).
		when("/profile/userProfile",{
			controller:"userProfileController",
			templateUrl:"../app/profile/userProfile/userProfile.html"
		}).
		when("/profile/userDashboard",{
			templateUrl:"../app/profile/userDashboard/userDashboard.html",
			controller:"userDashboardController"
		}).
		when("/profile/adminDashboard",{
			templateUrl:"../app/profile/adminDashboard/adminDashboard.html",
			controller:"adminDashboardController",
		}).
		when("/profile/adminProfile",{
			templateUrl:"../app/profile/adminProfile/adminProfile.html",
			controller:"adminProfileController",
		}).
		when('/profile/chooseProfileViews',{
			templateUrl: '../app/profile/userProfile/modal/chooseProfileViews.html',
			controller:'profileViewModalController'
		}).
		when('/profile/changePassword',{
			templateUrl: '../app/profile/changePassword/changePassword.html',
			controller: 'changePasswordController'
		}).
		when('/logout',{
			templateUrl:'../app/profile/logout/logout.html',
			controller:'logoutContoller'
		}).
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