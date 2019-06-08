var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    { id: 1, name: 'Viet' },
    { id: 2, name: 'Hung' },
    { id: 3, name: 'Huy' }
];
// localhost::3000
app.get('/', function (req, res) {
    res.render('index', {
        name: 'Scraggy Duck'
    });
});

// localhost::3000/users
app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users,
        val: ''
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers,
        val: q
    });

});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

