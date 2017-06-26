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
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            resetChecked: resetChecked,
            updateChecks: updateChecks,
            findAllCountries: findAllCountries,
            findAllLanguages: findAllLanguages,
            findAllCategories: findAllCategories,
            updatePreferences: updatePreferences,
            findAllUsers: findAllUsers
        };
        return api;

        function findAllUsers(){
            console.log("finding users");
            var url = "/api/admin";
            return $http.get(url);
        }

        function updatePreferences(userId, language, category, country) {
            console.log("updating preferences");
            var preferences = {
                userId: userId,
                language: language,
                category: category,
                country: country

            };
            console.log(preferences);
            var url = "/api/update";
            return $http.post(url, preferences);
        }

        function findAllCountries(){
            console.log("finding countries");
            var url="/api/countries";
            var result = $http.get(url);
            console.log(result);
            return result;
        }

        function findAllLanguages(){
            console.log("finding languages");
            var url="/api/languages";
            var result = $http.get(url);
            console.log(result);
            return result;
        }

        function findAllCategories(){
            console.log("finding categories");
            var url="/api/categories";
            var result = $http.get(url);
            console.log(result);
            return result;
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            console.log(user);
            return $http.post(url, user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(username, password) {
            var user = {
                _id: (new Date()).getTime() + "",
                firstName: 'temp',
                lastName: 'temp',
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function checkLoggedIn() {
            return $http.get("/api/loggedin");
        }
        
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

        function resetChecked(userId){
            var url = '/api/user/userId/'+userId+'/checked';
            return $http.post(url);
        }

        function updateChecks(userId, checks){
            var url = '/api/user/userId/'+userId+'/updateChecked';
            return $http.post(url, checks);
        }
    }
})();