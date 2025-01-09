const mongoose=require('mongoose');
const { string } = require('yargs');

const userSchema=new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    image:String,
})

module.exports=mongoose.model('users',userSchema);