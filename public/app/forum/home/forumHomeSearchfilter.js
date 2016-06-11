(function() {
  angular
      .module('myApp')
      .filter('startFrom', startFrom);

  function startFrom() {
    return (input, start)
    {
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  }
})();
