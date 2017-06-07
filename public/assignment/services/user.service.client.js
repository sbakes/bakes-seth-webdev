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
            return $http.post("/api/assignment/user",user);
        }
        
        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username="+username);
        }
        
        function updateUser(user, uId) {
            console.log(user);
            console.log(uId);
            var url = '/api/assignment/user/' + uId;
            console.log(user);
            return $http.put(url, user);
        }
        
        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/assignment/user?username='+username+'&password='+password;
            console.log(url);
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = '/api/assignment/user/' + userId;
            console.log(url);
            return $http.get(url);
        }
    }
})();