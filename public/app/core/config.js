(function() {
    angular
        .module('myApp')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    angular.module('myApp').constant('defaultProfilePicture', '../images/profile/no_profile.png');
    angular.module('myApp').constant('uploadedProfilePicturePath', '../uploads/profile/');
    angular.module('myApp').constant('DEPARTMENTS', ['mechanical', 'mechatronics', 'ECE', 'CS', 'IT']);
    angular.module('myApp').constant('TITLE', ['Mechanical Projects', 'Aeronatical Projects', 'ECE Projects', 'Embaded projects', 'IT Projects']);
    angular.module('myApp').constant('SUB_HEADS', ['CEA-ATMEL', 'CEA-OTHERS', 'CEC-PC BASED', 'CEA-DSP PROJECTS', 'IEEE PAPERS']);
    angular.module('myApp').constant('CATELOG_CODE', ['CIS-C# NET PROJECTS', 'CDB BIO MEDICAL PROJECTS', 'C,C++ AND VC++ PROJECTS', 'CAD/CAM/CAE PROJECTS', 'CIVIL DESIGN PROJECTS']);
    angular.module('myApp').constant('DOMAIN', ['RFID', 'ROBOTICS', 'BIOMEDICAL PROJECTS', 'C,C++ AND VC++ PROJECTS', 'CIVIL DESIGN Projects']);


    angular.module('myApp').constant('UPLOAD_DOC_PATH', 'uploads/documents/');

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
            }).when('/sms/sendMessage', {
                templateUrl: 'app/sms/messages/message.html',
                controller: 'messageController'
            }).when('/sms/sendMessageByProject', {
                templateUrl: 'app/sms/messages/messageByProjects.html',
                controller: 'messageController'
            }).when('/sms/deliveryReport', {
                templateUrl: 'app/sms/deliveryReport/deliveryReport.html',
                controller: 'deliveryController'
            }).when('/sms/group', {
                templateUrl: 'app/sms/group/group.html',
                controller: 'groupController'
            }).when('/sms/members', {
                templateUrl: 'app/sms/member/members.html',
                controller: 'memberController'
            }).when('/fb/login', {
                templateUrl: 'app/fbMessage/login/fbLogin.html',
                controller: 'fbLoginController'
            }).when('/fb/fbMessageReport', {
                templateUrl: 'app/fbMessage/fbMessageReport/fbMessageReport.html',
                controller: 'fbMessageReportController'
             }).when('/fb/advancedMessage', {
                templateUrl: 'app/fbMessage/advancedMessage/advancedFbFriendsList.html',
                controller: 'advancedFbFriendsListController'
            }).when('/documents/waterMarkModule', {
                templateUrl: 'app/documents/waterMarkModule/waterMark.html',
                controller: 'waterMarkController'
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