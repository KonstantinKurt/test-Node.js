const express = require('express'); // Подключаем модуль Express;
const app = express(); 
// Подключаем модуль express-handlebars и создаем макет по умолчанию;
const handlebars = require('express-handlebars') .create({ defaultLayout: 'main' });         
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); 
app.use(express.static(__dirname + '/public')); //Подключаем статические ресурсы;
app.set('port', process.env.PORT || 3000);  //Указываем порт(переменная окружения PORT или 3000);
app.get('/', function(req, res) { //Метод добавления маршрутов, в данном случае для стартовой страницы;
    res.render('startForm'); 
});
app.get('/logIn', function(req, res) { 
    res.render('logIn'); 
});
app.get('/sighIn', function(req, res) { 
    res.render('sighIn'); 
});

// пользовательская страница 404
app.use(function(req, res) {    // Метод подключения промежуточного ПО;
    res.status(404);
    res.render('404');
});
// пользовательская страница 500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), function() {
    console.log('Express запущен на http://localhost:' +
        app.get('port') + '; нажмите Ctrl+C для завершения.');
});