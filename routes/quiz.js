const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list ,deleteAll} = require('../controllers/quiz');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/quiz/create', create);
// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/category/:categoryId', remove);
router.get('/quizes', list);
router.delete("/quizes/remove",deleteAll)

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
