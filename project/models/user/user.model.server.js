module.exports = function () {

    var userSchema = require("./user.schema.server")();
    var countrySchema = require("./country.schema.server")();
    var languageSchema = require("./language.schema.server")();
    var categorySchema = require("./category.schema.server")();
    var mongoose = require("mongoose");
    var user = mongoose.model("user", userSchema);
    var country = mongoose.model("country", countrySchema);
    var language = mongoose.model("language", languageSchema);
    var category = mongoose.model("category", categorySchema);

    user.createUser = createUser;
    user.findUserById = findUserById;
    user.findUserByCredentials = findUserByCredentials;
    user.deleteUser = deleteUser;
    user.updateUser = updateUser;
    user.findUserByFacebookId = findUserByFacebookId;
    country.findCountries = findCountries;
    language.findLanguages = findLanguages;
    category.findCategories = findCategories;
    user.updatePreferences = updatePreferences;
    user.getAllUsers = getAllUsers;

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByFacebookId: findUserByFacebookId,
        removeChecks: removeChecks,
        updateChecks: updateChecks,
        findCountries: findCountries,
        findLanguages: findLanguages,
        findCategories: findCategories,
        updatePreferences: updatePreferences,
        getAllUsers: getAllUsers
    };
    return api;

    // //test data
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

    function getAllUsers(){
        return user.find({});
    }

    function updatePreferences(preferences){
        console.log("Updating Preferences");
        console.log(preferences);
        var userId = preferences.userId;
        var category = preferences.category;
        var country = preferences.country;
        var language = preferences.language;
        return user.update(
            {_id: userId},
            {$set:
                {categories: category,
                countries: country,
                languages: language}
            }
        );

    }

    function findCountries(){
        console.log("finding countries");
        return country.find({});
    }

    function findLanguages(){
        console.log("finding languages");
        return language.find({});
    }

    function findCategories(){
        console.log("finding categories");
        return category.find({});
    }

    function findUserByFacebookId(facebookId) {
        return user.findOne({'facebook.id': facebookId});
    }
    
    function createUser(userNew) {
        console.log(userNew);
        console.log("creating user");
        var createdUser =  user.create(userNew);
        return createdUser;
    }

    function removeChecks(userId) {
        return user.update(
        {_id: userId},
        {$set:
            {sources: []}
        }
        );
        console.log("checks removed");
    }

    function updateChecks(userId, checks){
        return user.update(
            {_id: userId},
            {$set:
                {sources: checks}
            }
        );
    }
    
    function deleteUser(userId) {
        return user.remove({_id: userId});
    }
    
    function updateUser(userId, userNew) {
        console.log(userNew);
        return user.update(
            {_id: userId},
            {$set:
                {
                    firstName: userNew.firstName,
                    lastName: userNew.lastName,
                    email: userNew.email
                }}
        );
    }
    
    function findUserByUsername(username) {
        console.log(username);
        console.log("finding user by username Server");
        //console.log(user.findOne({username: username}));
        return user.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        console.log("------------");
        console.log(username);
        console.log(password);
        console.log("finding user by credentials");
        return user.findOne({username: username, password: password});
    }
    
    function findUserById(userId) {
        console.log("finding user by ID");
        console.log(userId);
        return user.findOne({_id: userId});
    }
};