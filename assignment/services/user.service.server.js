var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {

    //console.log(models);
    var userModel = models.userModel;

    //app.get('/api/assignment/:userId', findUserByCredentials);
    app.get('/api/user/:userId', findUserById);
    //app.get('/api/assignment/user/:userId', findUserByUsername);
    app.get('/api/user', findUser);
    app.get("/api/loggedin", loggedin);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    //var users = users;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || "1934844753471215",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || "6aba1f21b0a5febd6345ac5965fe20a3",
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL || "http://127.0.0.1:3000/auth/facebook?cb"
    };



    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        var name = profile.displayName;
        userModel
            .findUserByFacebookId(id)
            .then(function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = {
                            username: profile.displayname.replace(/ /g, ''),
                            facebook: {
                                id: id,
                                displayName: name
                            }
                        };
                        return userModel
                            .createUser(newUser);
                    }
                }
            ).then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (error) {
                    done(error, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        console.log(user);
        console.log("in login");
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        console.log(newUser);
        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                console.log(user);
                    if (user != null) {
                        console.log("Username already exists");
                        res.sendStatus(404);
                        return;
                    } else {
                        console.log("username available");
                        var encryptedPassword = bcrypt.hashSync(newUser.password);
                        newUser.password = encryptedPassword;
                        console.log(newUser);
                        var newU = userModel.createUser(newUser);
                        console.log(newU);
                        return newU;
                    }
                },function (error) {
                    console.log ("bad post error");
                    res.sendStatus(404);
                }).then(function (user) {
                console.log("user created, logging in");
                    if(user != null) {
                        req.login(user, function(err) {
                            if(err) {
                                console.log("400");
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function localStrategy(username, password, done) {
        console.log("local strategy in use");
        console.log(username);
        console.log(password);
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                console.log('username found');
                console.log(user);
                console.log(password);
                console.log(user.password);
                return done(null, user);
                var result = bcrypt.compareSync(password, user.password);
                console.log("bcrypt successful");
                console.log(result);
                if (result) {
                    console.log("bcrypt complete");
                    return done(null, user);
                }else {
                    console.log("Issue with bcrypt");
                    return done(error, null);
                }
                }, function (error) {
                    return done(error, null);
                }
            );
    }

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
        // var user = users.find(function (user) {
        //     return user._id === userId;
        // });
        // var index = users.indexOf(user);
        // users.splice(index, 1);
        // res.sendStatus(200);

        userModel
            .deleteUser(userId)
            .then(function(success) {
                res.send(200);
            }, function(error){
                res.sendStatus(404);
            });
    }

    function updateUser(req, res) {
        // console.log("updating user");
        var user = req.body;
        var userId = req.params.userId;
        // console.log(userId);
        // console.log(user);
        // for (var u in users) {
        //     if (userId === users[u]._id) {
        //         console.log("found it!");
        //         var index = users.indexOf(users[u]);
        //         console.log(u);
        //         users[index] = user;
        //         console.log(users[u]);
        //         console.log(user);
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        userModel
            .updateUser(userId, user)
            .then(function(user){
                res.json(user);
            }, function(error) {
                res.sendStatus(404);
            });
    }

    function createUser(req, res) {
         var user = req.body;
         user._id = (new Date()).getTime() + "";
         console.log(user);
        // users.push(user);
        // res.json(user);
        userModel
            .createUser(user)
            .then(function(success) {
                console.log("creating user");
                console.log(success);
                res.json(success);
            }, function(error) {
                console.log(error);
                res.sendStatus(400).send("Username "+user.username+" is already in use");
            });

    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);
        // console.log([username, password]);
        // for (var u in users) {
        //     var user = users[u];
        //     if (user.username === username &&
        //         user.password === password) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // console.log("error finding user by credentials");
        // res.sendStatus(404);
        userModel
            .findUserByCredentials(username, password)
            .then(function(success) {
                if(success === null) {
                    console.log("user cannot be null");
                    console.log(success);
                    res.sendStatus(404);
                } else {
                    console.log(success);
                    console.log("login Successful");
                    res.json(success);
                }
            }, function(error) {
                res.status(404).send(error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        console.log("username: " + username);
        // console.log(username);
        // for (var u in users) {
        //     if (users[u].username === username) {
        //         res.json(users[u]);
        //         return;
        //     }
        // }
        // console.log("error finding user by username");
        // res.sendStatus(404);
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                console.log(user);
                if(user === null) {
                    console.log("found username");
                    res.sendStatus(404);
                }
                else {
                    console.log("found user by username");
                    res.json(user);
                }
            }, function(error) {
                res.sendStatus(404).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        // console.log(userId);
        // //var userId = req.query._id;
        // //var userId = parseInt(req.params.uid);
        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         console.log("found him!");
        //         console.log(users[u]);
        //         res.json(users[u]);
        //         return;
        //     }
        // }
        // console.log("did not find user)");
        // res.sendStatus(404);
        userModel
            .findUserById(userId)
            .then(function(user){
                res.json(user);
            }, function(error) {
                res.sendStatus(404).send(error);
            });

    }
};
