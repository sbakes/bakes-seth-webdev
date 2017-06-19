module.exports = function () {

    var userSchema = require("./user.schema.server")();
    var mongoose = require("mongoose");
    var user = mongoose.model("user", userSchema);

    user.createUser = createUser;
    user.findUserById = findUserById;
    user.findUserByCredentials = findUserByCredentials;
    user.deleteUser = deleteUser;
    user.updateUser = updateUser;
    user.findUserByFacebookId = findUserByFacebookId;

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    // //test data
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

    function findUserByFacebookId(facebookId) {
        return user.findOne({'facebook.id': facebookId});
    }
    
    function createUser(userNew) {
        console.log(userNew);
        console.log("creating user");
        var createdUser =  user.create(userNew);
        return createdUser;
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