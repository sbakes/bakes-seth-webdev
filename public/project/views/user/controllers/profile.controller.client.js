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
            model.isAdmin = isAdmin;
            model.adminPortal = adminPortal;
            model.notUser = notUser;
            model.deleteUser = deleteUser;
                userService
                    .findUserById(model.userId)
                    .then(function(success) {
                        model.user = success.data;
                        console.log(success.data);
                        //model.user = model.userArr[0];
                        console.log(model.user);
                        console.log("Successfully retrieved user");
                        pastComments(model.userId, model.user.username);
                        if(isAdmin()){
                            adminPortal();
                        }
                    }, function(error) {
                        console.log(error);
                        console.log("unable to retrieve user info");
                    });
            //pastComments()

        }
        init();

        function notUser(user){
            if(user.username === model.user.username){
                return false;
            } else {
                return true;
            }
        }

        function adminPortal(){
            userService
                .findAllUsers()
                .then(function(success){
                    $scope.users = success.data;
                    console.log($scope.users);
                }, function(error){
                    model.error = "unable to retrieve user accounts";
                })
        }

        function pastComments(userId, username){
            //console.log(username);
            pageService
                .findPageByAuthorId(username, model.userId)
                .then(function(success){
                    console.log("found comments");
                    //$location.url('/user/' + model.userId + "/pastComments");
                    $scope.pastComments = success.data;
                    console.log($scope.pastComments);
                    //$location.url("#/user/"+model.userId+"/pastComments");
                }, function(error){
                    model.error = "error retrieving comments";
                })

        }

        function isAdmin(){
            //console.log(model.user.admin);
            if(model.user.admin[0] === "TRUE"){
                return true;
            } else {
                return false;
            }
        }

        function deleteUser(userId){
            userService
                .deleteUser(userId)
                .then(function(success){
                    model.message = "user deleted";
                    adminPortal();
                }, function(error){
                    model.error = "unable to delete user";
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