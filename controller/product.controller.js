var db = require('../db');

module.exports.index = function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var drop = (page - 1) * perPage;

    res.render('products/index', {
        products: db.get('products').drop(drop).take(perPage).value(),
        current: page,
        pages: 10//Math.ceil(db.get('products').value().length())
    });
};