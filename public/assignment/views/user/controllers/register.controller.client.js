(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            var userNew = model.user;
                userNew.username = username;
                userNew.password = password;


            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            //promise
            var found = userService.findUserByUsername(username);
            found
                .then(function (found) {
                    model.error = "Username is not available";
                },
                (function () {
                userService
                    .createUser(userNew)
                    .then(function (userNew) {
                        $location.url('/user/' + userNew._id);
                    },
                    (function () {
                        model.error = "failed to register user";
                    }));

            }));

            // model.message = user;
            //userService.createUser(user);
            //$location.url('/user/' + user._id);
        }
    }
})();