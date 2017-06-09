module.exports = function(app) {

    //app.get('/api/assignment/:userId', findUserByCredentials);
    app.get('/api/user/:userId', findUserById);
    //app.get('/api/assignment/user/:userId', findUserByUsername);
    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    //var users = users;

    function findUser(req, res) {
        console.log("Parsing request");
        //var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            console.log("password and username");
            findUserByCredentials(req, res);
        } else if (query.username) {
            console.log("just username");
            findUserByUsername(req, res);
        }

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

    function updateUser(req, res) {
        console.log("updating user");
        var user = req.body;
        var userId = req.params.userId;
        console.log(userId);
        console.log(user);
        for (var u in users) {
            if (userId === users[u]._id) {
                console.log("found it!");
                var index = users.indexOf(users[u]);
                console.log(u);
                users[index] = user;
                console.log(users[u]);
                console.log(user);
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        console.log(user);
        users.push(user);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log([username, password]);
        for (var u in users) {
            var user = users[u];
            if (user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        console.log("error finding user by credentials");
        res.sendStatus(404);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        console.log(username);
        for (var u in users) {
            if (users[u].username === username) {
                res.json(users[u]);
                return;
            }
        }
        console.log("error finding user by username");
        res.sendStatus(404);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        //var userId = req.query._id;
        //var userId = parseInt(req.params.uid);
        for (var u in users) {
            if (users[u]._id === userId) {
                console.log("found him!");
                console.log(users[u]);
                res.json(users[u]);
                return;
            }
        }
        console.log("did not find user)");
        res.sendStatus(404);
    }
};
