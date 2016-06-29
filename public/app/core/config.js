(function() {
    angular
        .module('myApp')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('myApp').constant('defaultProfilePicture', '../images/profile/no_profile.png');
    angular.module('myApp').constant('uploadedProfilePicturePath', '../uploads/profile/');

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'loginController',
                templateUrl: '../app/profile/login/login.html'
            }).when('/profile/userProfile', {
                controller: 'userProfileController',
                templateUrl: '../app/profile/userProfile/userProfile.html'
            }).when('/profile/dashboard', {
                templateUrl: '../app/profile/dashboard/dashboard.html',
                controller: 'dashboardController'
            }).when('/profile/adminProfile', {
                templateUrl: '../app/profile/adminProfile/adminProfile.html',
                controller: 'adminProfileController'
            }).when('/profile/chooseProfileViews', {
                templateUrl: '../app/profile/userProfile/modal/chooseProfileViews.html',
                controller: 'profileViewModalController'
            }).when('/profile/changePassword', {
                templateUrl: '../app/profile/changePassword/changePassword.html',
                controller: 'changePasswordController'
            }).when('/logout', {
                templateUrl: '../app/profile/logout/logout.html',
                controller: 'logoutController'
            }).when('/project/home', {
                controller: 'homeController',
                templateUrl: '../app/project/home/home.html'
            }).when('/project/projectReg', {
                controller: 'projectRegController',
                templateUrl: '../app/project/projectReg/projectReg.html'
            }).when('/forum/home', {
                controller: 'forumController',
                templateUrl: '../app/forum/home/forum.html'
            }).when('/documents/editDoc', {
                templateUrl: 'app/documents/documentUpload/singleFileUpload.html',
                controller: 'fileUploadController'
            }).when('/documents/singleFileUpload', {
                templateUrl: 'app/documents/documentUpload/singleFileUpload.html',
                controller: 'fileUploadController'
            }).when('/documents/documentSearch', {
                templateUrl: 'app/documents/search/search.html',
                controller: 'searchController'
            }).when('/documents/documentList', {
                templateUrl: 'app/documents/documentList/documentList.html',
                controller: 'documentListController'
            }).when('/documents/multipleFileUpload', {
                templateUrl: 'app/documents/documentUpload/multipleFileUpload.html',
                controller: 'fileUploadController'
            }).when('/documents/viewDocument', {
                templateUrl: 'app/documents/viewDocument/viewDocument.html',
                controller: 'viewDocumentController'
            }).when('/error', {
                templateUrl: '../app/core/error.html'
            }).when('/error/message', {
                templateUrl: 'app/error/errorMessage.html',
                controller:'errorMessageController'
            }).otherwise({
                redirectTo: '/error'
            });

        $locationProvider.html5Mode(true);
    }
})();