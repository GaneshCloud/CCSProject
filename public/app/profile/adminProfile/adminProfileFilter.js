/**
 * Created by CSS on 27-05-2016.
 */

(function() {
  angular
      .module('myApp')
      .filter('startFrom', startFrom);

  function startFrom() {
    return function (input, start) {
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  }
})();