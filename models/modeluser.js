const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchemaa = new mongoose.Schema(
    {
        name: {
            type: String, 
            trim: true,
            required: true, 
            maxlength: 32
        },
        email:{
            type: String, 
            trim: true,
            // required: true, 
            maxlength: 32
        },
        password: {
            type: String,
            trim: true,
            required: true,
            // unique: true 
        },
        courses: { type: Array, required: false },
         role:{
             type: String,
             default:'Student'
         },
         userQuizes:{
            type: Array, required: false
         }
        
    },
    { timestamps: true }
);




//virtual field
// userSchema
//     .virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function() {
//         return this._password;
//     });

// userSchema.methods = {
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },

//     encryptPassword: function(password) {
//         if (!password) return '';
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (err) {
//             return '';
//         }
//     }
// };

module.exports = mongoose.model('UserModel', userSchemaa);
