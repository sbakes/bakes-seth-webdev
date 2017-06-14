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
            $http.post("/api/user",user);
            var url = "/api/user?username="+user.username;
            console.log(user.username);
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            console.log("finding user by username");
            var result = $http.get("/api/user?username="+username);
            return result
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
            console.log(userId);
            console.log(url);
            return $http.get(url);
        }
    }
})();