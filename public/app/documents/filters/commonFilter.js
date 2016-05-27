

'use strict';
//this is the filter for setting the date format
myApp.filter('myDate', function($filter)
	{
 		return function(input)
 			{
  				if(input === null){ return ""; } 
  				var _date = $filter('date')(new Date(input), 'dd-MM-yyyy');
  				return _date;
 			};
});