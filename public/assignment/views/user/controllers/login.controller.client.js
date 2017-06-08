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
                        vm.message = "Welcome " + user.username;
                        $location.url('/user/' + user._id);
                    } else {
                        vm.alert = "Username " + user.username + " not found, please try again";
                    }
                }, function(error) {
                    console.log(error);
                    console.log("Error Retrieving Username");
                    vm.alert = "Error logging in";
                })
                };
        }

})();