const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    finishQuiz,
    UserQuizList,
    deleteAll,
    buyCourse,
    UserBuyCourses,
    deleteAllCourses
} = require("../controllers/userAuth");
const {
signin
} = require('../controllers/auth')
const { userSignupValidator } = require("../validator");
router.get('/secrett', (req, res) => {
    res.json({
        user: 'got here yay'
    });
});
router.post("/signup",  signup);
router.post("/finishQuiz",  finishQuiz);
router.post("/buyCourse",  buyCourse);
router.get("/userQuizList",  UserQuizList);
router.get("/userBuyCourses",  UserBuyCourses);

router.delete("/delete-Quizes",  deleteAll);
router.delete("/delete-Courses",  deleteAllCourses);


router.post("/signin", login);
// router.get("/signout", signout);

module.exports = router;
