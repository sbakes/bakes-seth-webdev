(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init(){
            console.log(model.userId);
            model.update = update;
                userService
                    .findUserById(model.userId)
                    .then(function(success) {
                        model.user = success.data;
                        console.log(success.data);
                        //model.user = model.userArr[0];
                        console.log(model.user);
                        console.log("Successfully retrieved user");
                    }, function(error) {
                        console.log(error);
                        console.log("unable to retrieve user info");
                    });
        }
        init();

        function update(user){
            console.log(user);
            user._id = model.userId;
            userService
                .updateUser(user, model.userId)
                .then(function (success) {
                    console.log(success.data);
                    model.message = "Update successful";
                    console.log("successfully updated user")
                },function (error) {
                    console.log(error);
                    console.log("Error Updating Profile");
                    model.error = "Unable to update user";
                });

        }
    }

})();