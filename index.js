const express = require('express'); // Подключаем модуль Express;
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const currentUser = require('./libs/currentUser.js');
// Подключаем модуль express-handlebars и создаем макет;
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); //Подключаем статические ресурсы;
app.set('port', process.env.PORT || 3000); //Указываем порт(переменная окружения PORT или 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Подключаем функции промежуточной обработки (middleware);
app.get('/', function(req, res) {
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
    console.log(currentUser.getCurrentUserName());
    res.send('Logged out!');
});
app.get("/content", function(req, res) {
    fs.readFile("./data/content.json", "utf8", function(err, data) {
        if (err) { console.error(err.stack); }
        let content = JSON.parse(data);
        res.send(content);
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
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == name && users[i].password) {
                loggedUser = users[i];
                break;
            }
        }
        if (loggedUser !== undefined) {
            currentUser.setCurrentUser(loggedUser);
            res.send('Successful');
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