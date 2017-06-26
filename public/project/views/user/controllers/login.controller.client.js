(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService, $rootScope) {

        var vm = this;

        function init() {
            vm.login = login;

        }
        init();

        function login(user) {
            console.log(user);

            if (user === undefined) {
                vm.message = 'Please enter username and password';
            }

            if (user.username === undefined ||
                user.password === undefined) {
                vm.message = 'Please enter username and password';
            } else {
                userService
                    .login(user.username, user.password)
                    .then(
                        function (response) {
                            console.log("success");
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            }
                        },
                        function (error) {
                            vm.alert = error.data;
                        }
                    );
            }
        }

            //promise
            // userService
            //     .findUserByCredentials(user.username, user.password)
            //     .then(function(user) {
            //         console.log(user);
            //         if (user !== null) {
            //             console.log(user.data);
            //             console.log(user._id.toString());
            //             console.log("welcome");
            //             vm.message = "Welcome " + user.username;
            //             $location.url('/user/' + user._id);
            //         } else {
            //             vm.alert = "Username " + user.username + " not found, please try again";
            //             vm.message = "Username & password not found"
            //         }
            //     }, function(error) {
            //         console.log(error);
            //         console.log("Error Retrieving Username");
            //         vm.alert = "Error logging in";
            //         vm.message = "Username & password not found"
            //     })
            //     };
        }

})();