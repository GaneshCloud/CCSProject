(function() {
    angular
        .module("myApp")
        .directive('fileInput', ['$parse', '$http', function ($parse, $http) {
            return {
                restrict: 'A',
                link: function (scope, element, attributes) {
                    element.bind('change', function () {

                        $parse(attributes.fileInput)
                            .assign(scope, element[0].files[0]);
                        // scope.$apply();
                        console.log(element[0].files[0]);
                        // scope.sendFile();
                    });
                }
            };
        }]);
})();