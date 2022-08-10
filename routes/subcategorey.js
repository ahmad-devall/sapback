const express = require('express');
const router = express.Router();

const { create,someValue,list } = require('../controllers/subcategorey');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// router.get('/category/:categoryId', read);
router.post('/SubCategory/create', create);
router.post('/SubCategory/get', someValue);

// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
// router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

// router.delete('/category/:categoryId', remove);
router.post('/SubCategories/list', list);

// router.param('categoryId', categoryById);
// router.param('userId', userById);

module.exports = router;

