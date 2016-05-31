/**
 * Created by CSS on 27-05-2016.
 */
myApp.filter('startFrom', function() {
  return function(input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});