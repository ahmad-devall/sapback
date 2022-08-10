const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: 32
        },
        lastName: {
            type: String,
            trim: true,
            required: false
        },
        email: {
            type: String,
            trim: true,
            required: false
        },
        phone: {
            type: String,
            trim: true,
            required: false,
        },
        company: {
            type: String,
            trim: true,
            required: false,
        },
        message:{
            type: String,
            trim: true,
            required: false,
        }
        // password: {
        //     type: String,
        //     trim: true,
        //     required: true,
        //     unique: true
        // },
        
        
    },
    { timestamps: true }
);

// virtual field
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

module.exports = mongoose.model('UserMessage', userSchema);
