const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        default:'',
        max: 50
    },
    city: {
        type: String,
        default:'',
        max: 50
    },
    from: {
        type: String,
        default:'',
        max: 50
    },
    relationship: {
        type: Number,
        default:1,
        enum: [1, 2, 3]
    }
}
    , { timestamps: true }
);

// userSchema.pre('save',async function (next){
//     if(this.isModified('password')){
//         const salt = await bcrypt.genSalt(12)
//         this.password = await bcrypt.hash(this.password,salt);
//     }
//     next();
// });



const User = mongoose.model('USER', userSchema);
module.exports = User;