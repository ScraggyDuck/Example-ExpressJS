require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/authh.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(csurf({cookie: true}));
app.use(sessionMiddleware);

// localhost::3000
app.get('/', function (req, res) {
    res.render('index', {
        name: 'Scraggy Duck'
    });
});

// localhost::3000/users

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer',  authMiddleware.requireAuth, transferRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

