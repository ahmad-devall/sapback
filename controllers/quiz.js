const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Quiz = require('../models/Quiz');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};

exports.deleteAll = async(req, res) => {
    // let product = req.product;
    try {
        await Quiz.remove({})
  
      res.status(200).json({ message: "product Deleted Successfully" });
    } catch (e) {
      res.status(500).json({ message: "something went wrong deleteProduct" });
      console.log(e);
    }
};

exports.create = (req, res) => {
    const category = new Quiz(req.body);
    category.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err) 
            });
        }
        res.json({ data });
    }); 
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    Product.find({ category }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            });
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
};


exports.list = (req, res) => {
    console.log('call')
    Quiz.find()
    .populate('category')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
