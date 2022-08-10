const User = require('../models/userMessage');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sgMail2 = require('@sendgrid/mail');
sgMail2.setApiKey('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');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.list = (req, res) => {
    console.log('call')
    User.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    }); 
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


exports.create = (req, res) => {
    console.log('call')
    const user = new User(req.body);
    user.save((err, data) => {
        if (err) { 
            return res.status(400).json({ 
                error: errorHandler(err)
            });
        }
        const msg = {
            to: 'contact@imt.ventures',
            from: 'contact@imt.ventures', // Use the email address or domain you verified above
            subject: req.body.company,
            text: `New Message from ${req.body.firstName}`,
            html: `<strong>
           Name : ${req.body.firstName} 
           <br>
           Message :  ${req.body.message}
           <br>
           Company : ${req.body.company}
           <br>
           Contact No : ${req.body.phone}

            </strong>`,
          };
        sgMail 
        .send(msg)
        .then(() => {
            console.log('mail sended')
        }, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
        res.json({ data });
    });
};
exports.subscribe = (req, res) => {
    console.log('sendinggggggggg')
        const msg = {
            to: req.body.email,
            from: 'contact@rocketbot.cloud', // Use the email address or domain you verified above
            subject: 'IMT News Letter',
            text: `New Message from IMT`,
            html: `
          <h4>  Hello from RocketBot, </h4>
          </br>
          </br>

         <p>  <strong> Congratulations! </strong> You have taken your first step into the world of automated cryptocurrency trading. RocketBot is your trading partner, a friendly face in the world of cryptocurrency. Follow a leader, or create your own path – RocketBot will be there to help, every step of the way. </p>
           </br>
           </br>
            So how does RocketBot work?
            
            </br>
            </br>

<p>
            RocketBot connects to your existing cryptocurrency exchange, and in just a couple of steps, RocketBot will start trading for you. You select a trading strategy, setup your trading bot, then watch as RocketBot goes to work!
            </p>
            </br>

           <p> RocketBot knows that successfully trading cryptocurrency is a time consuming exercise, surrounded by confusing interfaces and overwhelming data.
           </p>

            </br>
           
           <p> RocketBot turns beginners into experts, by doing the hard work for you. Spend less time watching the markets, and more time learning and sharing knowledge – within an engaged and active community </p>
            </br>
            </br>
            
       <p>     “Hey RocketBot, I’m already an expert trader” </p>

            </br>
            </br>
            
         <p>   Great, you can build your own custom bot, and combine your trading knowledge with RocketBots clever algorithms. Once you have created your Bot, other RocketBot users will be able to follow your plan, as part of RocketBot Social Trading network.
         </br>
            
         <p>    Remember – RocketBot is your trading partner, and you must understand there is always risk involved when trading cryptocurrency. What RocketBot offers is the ability to trade smarter, and work harder - for you.
             </p>
            </br>
            </br>

          <p>  So what are you waiting for, let’s start trading! </p>
             </br>
          </br>
           
           <h2> To be added later </h2>
            
         <p>   -  Sign up now with the code xxxxxxx to receive 10% off your first month subscriptions. </p>
            </br>
       <p>     -  Refer a friend, and receive commision on their earnings, through the RocketBot Social Trading platform.
           </p>`,
          };
        sgMail2 
        .send(msg)
        .then(() => {
            console.log('mail sended')
            
        }, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
        res.json({name:'Nuhammad Usama Gill'});
       
};

// exports.update = (req, res) => {
//     console.log('user update', req.body);
//     req.body.role = 0; // role will always be 0
//     User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'You are not authorized to perform this action'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json(user);
//     });
// };

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};
