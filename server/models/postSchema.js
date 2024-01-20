const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default:'',
        max:500
    },
    img: {
        type: Array,
        default:[]
    },
    likes: {
        type: Array,
        default:[]
    }
    
}
    , { timestamps: true }
);

// postSchema.pre('save',async function (next){
//     if(this.isModified('password')){
//         const salt = await bcrypt.genSalt(12)
//         this.password = await bcrypt.hash(this.password,salt);
//     }
//     next();
// });



const User = mongoose.model('POST', postSchema);
module.exports = User;