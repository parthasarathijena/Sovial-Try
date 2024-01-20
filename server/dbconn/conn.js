const mongoose = require('mongoose');

const dburl =  'mongodb+srv://jubul577:partha123@socialdb.7geyn06.mongodb.net/social?retryWrites=true&w=majority';
mongoose.connect(dburl).then(()=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.log(err);
})