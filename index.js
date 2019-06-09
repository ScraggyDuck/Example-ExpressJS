var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/authh.route');

var authMiddleware = require('./middlewares/auth.middleware');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('fsdafdsafasd23423f'));

// localhost::3000
app.get('/', function (req, res) {
    res.render('index', {
        name: 'Scraggy Duck'
    });
});

// localhost::3000/users

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

