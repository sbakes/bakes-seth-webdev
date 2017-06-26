(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService, $rootScope) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            console.log(username);
            console.log(password);
            console.log(password2);

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            if (username === undefined ||
                password === undefined) {
                model.error = 'Please enter username and password';
                return;
            }

            var userNew = {
                admin: "FALSE",
                username: username,
                password: password,
                firstName: "temp",
                lastName: "temp"

            };

            // userService
            //     .register(username, password)
            //     .then(function (response) {
            //             var user = response.data;
            //             $rootScope.currentUser = user;
            //             $location.url("/user/" + user._id);
            //         },
            //         function (error) {
            //             model.alert = error.data;
            //         }
            //     )



            //promise
            userService
                .findUserByUsername(userNew.username)
                .then(function (success) {
                    console.log(success.data);
                    model.error = "Username is not available";
                },
                function (error) {
                    console.log(error);
                    //noinspection JSUnresolvedFunction
                    userService
                        .createUser(userNew)
                        .then(function (success) {
                            console.log(success.data);
                            model.message = "successfully registered";
                            $location.url('/user/' + success.data._id);
                        },
                        function (error) {
                            console.log(error);
                            model.error = "failed to register user";
                        });

                });

            // model.message = user;
            //userService.createUser(user);
            //$location.url('/user/' + user._id);
        }
    }
})();