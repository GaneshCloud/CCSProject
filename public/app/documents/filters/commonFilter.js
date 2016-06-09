//This is the filter for setting the date format
(function() {
  angular
      .module('myApp')
      .filter('myDate', myDate);

  function myDate($filter) {
    return function(input)  {
      if (input === null) { return ''; }
      var _date = $filter('date')(new Date(input), 'dd-MM-yyyy');
      return _date;
    };
  }
})();