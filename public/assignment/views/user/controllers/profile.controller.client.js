(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;

        function init(){
            var userId = $routeParams['userId'];
            model.update = update;
            model.user = userService.findUserById(userId);

        }
        init();

        function update(user){

            userService
                .updateUser(user._id, user)
                .success(function () {
                    model.message = "Update successful";
                })
                .error(function () {
                    model.error = "Unable to update user";
                });

        }
    }

})();