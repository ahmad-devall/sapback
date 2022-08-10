const SubCategory = require('../models/subcategory');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const subcategory = require('../models/subcategory');


exports.create = (req, res) => {
    console.log('call')
    const subCategory = new SubCategory(req.body);
    subCategory.save((err, data) => {
        if (err) { 
            return res.status(400).json({ 
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};




exports.someValue = function(req, res, next) {
    //query with mongoose

    
    var query = SubCategory.find({"_id": req.body.category})
    query.exec(function (err, someValue) {
        if (err) return next(err);
        res.json(someValue);
    }); 
};
 
exports.list = (req, res) => {
    console.log('call')
    subcategory.find({category:req.body.id}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
