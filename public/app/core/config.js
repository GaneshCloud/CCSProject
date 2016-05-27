'use strict';

myApp.config(function($routeProvider, $locationProvider){

	$routeProvider.
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
			controller:"adminDashboardController"
		}).
		when("/profile/adminProfile",{
			templateUrl:"../app/profile/adminProfile/adminProfile.html",
			controller:"adminProfileController"
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
			controller:'logoutController'
		}).
		when("/project/home",{
			controller: "homeController",
			templateUrl: "../app/project/home/home.html"
		}).
		when("/project/upload", {
			controller: "uploadController",
			controllerAs: "up",
			templateUrl: "../app/project/upload/upload.html"
		}).
	    when('/forum/home',{
		    controller:'forumController',
			templateUrl:'../app/forum/home/forum.html'
	    }).
		when('/documents/editDoc', {
			templateUrl: 'app/documents/singleFileUpload/singleFileUpload.html',
			controller: 'singleFileUploadController'
		}).
		when('/documents/singleFileUpload', {
			templateUrl: 'app/documents/singleFileUpload/singleFileUpload.html',
			controller: 'singleFileUploadController'
		}).
		when('/documents/documentSearch', {
			templateUrl: 'app/documents/search/search.html',
			controller: 'searchController'
		}).
		when('/documents/documentList', {
			templateUrl: 'app/documents/documentlist/documentList.html',
			controller:   'documentListController'
		}).
		when('/documents/multipleFileUpload', {
			templateUrl: 'app/documents/multipleFileUpload/multipleFileUpload.html',
			controller:   'multipleFileUploadController'
		}).
		when('/documents/viewDocument', {
			templateUrl: 'app/documents/viewDocument/viewDocument.html',
			controller:   'viewDocumentController'
		}).
		when("/error",{
			templateUrl: "../app/core/error.html"
		}).
		otherwise({
			redirectTo:"/error"
		});

	$locationProvider.html5Mode(true);
});