
//This is the directive for assigning the file to the input type file
(function(){
  angular
      .module('myApp')
      .directive('validFile', validFile);

  function validFile() {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, ngModel) {
        el.bind('change', function () {
          scope.$apply(function () {
            ngModel.$setViewValue(el.val());
            ngModel.$render();
          });
        });
      }
    };
  }
})();