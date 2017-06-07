(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var vm = this;

        function init() {
            vm.login = login;

        }
        init();

        function login(user) {

            //promise
            userService
                .findUserByCredentials(user.username, user.password)
                .then(function(user) {
                    if (user !== null) {
                        $location.url('/user/' + user._id);
                        $scope.message = "Welcome " + user.username;
                    } else {
                        vm.alert = "Username " + user.username + " not found, please try again";
                    }
                }, function(error) {
                    console.log(error);
                    vm.alert = "Error logging in";
                })
                };
        }

})();