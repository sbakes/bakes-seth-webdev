(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;
        
        function createUser(user) {
            console.log("creating user");
            return $http.post("/api/user",user);
        }
        
        function findUserByUsername(username) {
            console.log("finding user by username");
            return $http.get("/api/user?username="+username);
        }
        
        function updateUser(user, uId) {
            console.log(user);
            console.log(uId);
            var url = '/api/user/' + uId;
            console.log(url);
            return $http.put(url, user);
        }
        
        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            console.log(url);
            return $http.get(url)
                .then(function(response){
                    console.log("Promise sent");
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            console.log(url);
            return $http.get(url);
        }
    }
})();