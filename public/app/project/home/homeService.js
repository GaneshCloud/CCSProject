'use strict';

myApp.factory('homeService',['$http','$window', function($http,$window){
	return {
		data: function(){
			return $http.get('/data');
		},
		projectHistory: function(){
			return $http.get('/projectHistory');
		},
		logout: function () {
			$window.location.href = '/logout';
		},
		goToDashboard: function () {
			$window.location.href = '/profile/userDashboard';
		},
		chartData: function(){
			return $http.get('/chartData');
		},
		imageData: function(){
			return $http.get('/imageData');
		},
		postQuestion: function(question){
			return $http.post('/postQuestion',[question]);
		}
	};
}]);