const UserModel = require('../models/modeluser');
const UserQuiz = require('../models/UserQuiz')
const bcrypt = require ("bcryptjs");
const randomstring = require  ("randomstring");
// import crypto from "crypto";
const jwt = require  ("jsonwebtoken");
const { JWT_SECRET }  = require ("../config.js");
const UserCourses = require('../models/UserCourses');
// const {
//   sendWelcomeEmail,
//   forgetPasswordEamil,



// } = require  ("../helpers/emailHelper.js");


exports.login = async (req, res, next) => {
  try {
    const email1 = req.body.email;
    // console.log(req.body)
    const password = req.body.password;
    const user = await UserModel.findOne({ email:email1 });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User With this email does not exist" });
    } 
    else{ 
        console.log('work')
        
    }
    console.log(user)
    const doMatch = bcrypt.compareSync(password, user.password);
    if (!doMatch) {
      return res
        .status(400)
        .json({ message: "you have entered wrong email or password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).json({ user, token });

  } catch (e) {
    res.status(500).json({ message: "something went wrong in login" });
    console.log(e);
  }
}



exports.finishQuiz = async (req, res, next) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userID });
   
    const userQuiz = new UserQuiz({
      userId: req.body.userID,
      userQuizes: req.body.userQuizes,
      quizInfo : req.body.quizInfo
      // total: req.body.total,
    });
  await  userQuiz.save((err, data) => {
      if (err) { 
          return res.status(400).json({ 
              error: errorHandler(err)
          });
      }
      res.json({ data });
  });
  
   
 
    // await user.clearCart();

    // // send email to user
   
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Placing Order" });
    console.log(e);
  }
};

exports.buyCourse = async (req, res, next) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userID });
   
    const userQuiz = new UserCourses({
      userId: req.body.userID,
      courses: req.body.courses,
     
      // total: req.body.total,
    });
    await userQuiz.save();
    
 
    // await user.clearCart();

    // // send email to user
   
    res.status(200).json({ message: "Your order has been placed" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Placing Order" });
    console.log(e);
  }
};


exports.UserQuizList = (req, res) => {
  console.log('call')
  UserQuiz.find()
  .populate('userId')
  .exec((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};
exports.UserBuyCourses = (req, res) => {
  console.log('call')
  UserCourses.find()
  .populate('userId')
  .exec((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};


exports.deleteAllCourses = async(req, res) => {
  // let product = req.product;
  try {
      await UserCourses.remove({})

    res.status(200).json({ message: "product Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong deleteProduct" });
    console.log(e);
  }
};

exports.deleteAll = async(req, res) => {
  // let product = req.product;
  try {
      await UserQuiz.remove({})

    res.status(200).json({ message: "product Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong deleteProduct" });
    console.log(e);
  }
};



exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
     const role = req.body.role
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName


    const user = await UserModel.findOne({ name: name }).exec();
    if (user) {
        console.log(user)
      return res
        .status(400)
        .json({ message: "the user with this email already exist try other" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new UserModel({
      email: email,
      name:name,
      password: hashedPassword,
       role: role,
    //   firstName,
    //   lastName
    });

    await newUser.save();
   
    res.status(200).json({ message: "user created successfully",data:newUser });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in signup" });
    console.log(e);
  }
};



// export const forgetPassword = async (req, res, next) => {
//   try {
//     const token = randomstring.generate({ length: 5, charset: "numeric" });
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).json({ message: "no user with this email found" });
//     }
//     user.resetToken = token;
//     user.resetTokenExpiration = Date.now() + 3600000;
//     await user.save();
//     forgetPasswordEamil({ token, to: req.body.email });
//     res
//       .status(200)
//       .json({ token,message: "An email has been sent to your email account" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in forget password" });
//     console.log(e);
//   }
// };

// export const setPasswordAfterforget = async (req, res, next) => {
//   try {
//     const password = req.body.password;
//     // const userId = req.userId;
//     const passwordToken = req.body.passwordToken;
//     let resetUser;

//     const user = await User.findOne({
//       email: req.body.email,
//       resetToken: passwordToken,
//       resetTokenExpiration: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "You are seems to be spam" });
//     }
//     resetUser = user;
//     const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//     resetUser.password = hashedPassword;
//     resetUser.resetToken = undefined;
//     resetUser.resetTokenExpiration = undefined;
//     await resetUser.save();

//     res.status(200).json({ message: "your password is successfully changed" });
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in setPasswordAfterforget" });
//     console.log(e);
//   }
// };

// export const getLoggedInUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(400).json({ message: "No User Found" });
//     }
//     return res.status(200).json(user);
//   } catch (e) {
//     res
//       .status(500)
//       .json({ message: "something went wrong in getLoggedInUser" });
//     console.trace(e);
//   }
// };
