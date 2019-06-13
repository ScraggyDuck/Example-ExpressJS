// var db = require('../db');
var Product = require('../models/product.model');

module.exports.index = function(req, res){
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;
    // var drop = (page - 1) * perPage;

    // var carts = db.get('sessions').value().cart;

    // if(!carts)
    //     carts = {sum: 0}

    // res.render('products/index', {
    //     products: db.get('products').drop(drop).take(perPage).value(),
    //     current: page,
    //     pages: 10,
    //     carts: carts
    // });
    Product.find()
        .then(function(products){
            res.render('products/index', {
                products: products
            });
        });
};