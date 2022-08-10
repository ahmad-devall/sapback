const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update, purchaseHistory,create,listUsers } = require('../controllers/modeluser');
 
// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         user: 'got here yay'
//     });
// });

router.post('/usersmodel/create', create);
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
router.get('/userList', listUsers);

router.param('userId', userById);

module.exports = router;
