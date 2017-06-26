(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams, pageService, $scope) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init(){
            console.log(model.userId);
            model.update = update;
            model.pastComments = pastComments;
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
            //pastComments()
        }
        init();

        function pastComments(userId, username){
            console.log(username);
            pageService
                .findPageByAuthorId(username, model.userId)
                .then(function(success){
                    console.log("found comments");
                    $scope.pastComments = success.data;
                    console.log($scope.pastComments);
                    //$location.url("#/user/"+model.userId+"/pastComments");
                    $location.url('/user/' + model.userId + "/pastComments");
                }, function(error){
                    model.error = "error retrieving comments";
                })

        }

        function update(user){
            console.log(user);

            if(user === undefined) {
                model.error = "User update cannot be empty";
                return;
            }

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

        function logout() {
            userService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        $location = "#/login";
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $location = "#/login";
                    }
                );
        }

        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchNews   = '';     // set the default search/filter term
    }

})();