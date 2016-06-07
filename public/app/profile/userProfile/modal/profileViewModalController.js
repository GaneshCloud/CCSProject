/**
 * Created by CSS on 25-05-2016.
 */

(function() {

    function profileViewModalController($scope) {

        // Var vm = this;

        $scope.showView = function(value) {

            if (value === 'local') {

                localStorage.setItem('localView',true);
                localStorage.setItem('facebookView',false);
                localStorage.setItem('googleView',false);

            }else if (value === 'facebook')	{

                localStorage.setItem('facebookView',true);
                localStorage.setItem('googleView',false);
                localStorage.setItem('localView',false);

            }else {

                localStorage.setItem('googleView',true);
                localStorage.setItem('facebookView',false);
                localStorage.setItem('localView',false);

            }

            this.$parent.$close();

        };

    }

    myApp.controller('profileViewModalController',profileViewModalController);

})();