const express = require('express'); 
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const currentUser = require('./libs/currentUser.js');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); 
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    let guest = {
        "name": "Guest",
        "password": "",
        "isAdmin": false
    };
    currentUser.setCurrentUser(guest);
    res.render('startForm', {
        currentUser: currentUser.getCurrentUserName()
    });
});
app.get('/logIn', function(req, res) {
    res.render('logIn');
});
app.get('/sighIn', function(req, res) {
    res.render('sighIn');
});
app.get('/personal', function(req, res) {
    res.render('personal', {
        currentUser: currentUser.getCurrentUserName()
    });
});
app.get('/logOut', function(req, res) {
    let guest = {
        "name": "Guest",
        "password": "",
        "isAdmin": false
    };
    currentUser.setCurrentUser(guest);
    console.log(currentUser.getCurrentUser());
    res.send('Logged out!');
});
app.get("/content", function(req, res) {
    fs.readFile("./data/content.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let content = JSON.parse(data);
        res.send(content);
    });

});
app.get("/users", function(req, res) {
    fs.readFile("./data/users.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let users = JSON.parse(data);
        res.send(users);
    });

});
app.get("/currentUser", function(req, res) {
    let currentUserResponse = currentUser.getCurrentUser();
    res.send(currentUserResponse);
});
app.post("/logInUser", function(req, res) {
    let name = req.body.name;
    let password = req.body.password;
    fs.readFile("./data/users.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let users = JSON.parse(data);
        let loggedUser;
        let reason;
        for (let i = 0; i < users.length; i++) {
            
            if (users[i].name == name && users[i].password == password) {
                loggedUser = users[i];
                break;
            }
        }
        if (loggedUser !== undefined) {
            currentUser.setCurrentUser(loggedUser);
            //console.log(currentUser.getCurrentUser());
            res.send('Successful');
        } else {
            
            res.status(401);
            res.send('User not found!');
        }
    });

});
app.post("/deleteBoughtContent", function(req, res) {
    let deletedName = req.body.name;
    fs.readFile("./data/content.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let content = JSON.parse(data);
        let index = -1;
        for (let i = 0; i < content.length; i++) {
            if (content[i].name == deletedName) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            let updatedContent = content.splice(index, 1)[0];
            let data = JSON.stringify(content);
            fs.writeFile("./data/content.json", data, function(err, data) {});
            res.send(updatedContent);
        } else {
            res.status(404).send();
        }
    });

});
app.post("/addContent", function(req, res) {
    let addedName = req.body.name;
    let addedPrice = req.body.price;
    fs.readFile("./data/content.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let content = JSON.parse(data);
        let newContent = {
            name: addedName,
            price: addedPrice
        };
        content.push(newContent);
        let updatedContent = JSON.stringify(content);
        fs.writeFile("./data/content.json", updatedContent, function(err, data) {});
        res.send(newContent);

    });

});
app.post("/sighnInUser", function(req, res) {
    let addedName = req.body.name;
    let addedPassword = req.body.password;
    let addedIsAdmin = req.body.isAdmin;
    fs.readFile("./data/users.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let users = JSON.parse(data);
        let newUser = {
            name: addedName,
            password: addedPassword,
            isAdmin: addedIsAdmin
        };
        let reject;
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == addedName) {
                reject = 'Wrong password!';
            }
        }
        if (reject) {
            res.status(302);
            res.send('This login is already exists!');
        } else {
            users.push(newUser);
            let updatedContent = JSON.stringify(users);
            fs.writeFile("./data/users.json", updatedContent, function(err, data) {});
            res.send('Login Successful!');
        }
    });
});
app.post("/deleteUser", function(req, res) {
    let deletedUserName = req.body.name;
    fs.readFile("./data/users.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let users = JSON.parse(data);
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == deletedUserName) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            let deletedUser = users.splice(index, 1)[0];
            let newUserData = JSON.stringify(users);
            fs.writeFile("./data/users.json", newUserData, function(err, data) {});
            res.send(deletedUser);
        } else {
            res.status(401);
            res.send('User not found!');
        }
    });

});
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express запущен на http://localhost:' + app.get('port') + '; нажмите Ctrl+C для завершения.');

});