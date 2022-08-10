const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update, purchaseHistory,create,list,subscribe } = require('../controllers/userMessage');
 
// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         user: 'got here yay'
//     });
// });

router.post('/message/send', create);
router.post('/email/subscribe', subscribe);

router.post('/users/list', list);
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

router.param('userId', userById);










module.exports = router;
