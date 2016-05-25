'use strict';

app.factory('homeService',['$http', function($http){
	return {
		data: function(){
			return $http.get('/data');
		},
		projectHistory: function(){
			return $http.get('/projectHistory');
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