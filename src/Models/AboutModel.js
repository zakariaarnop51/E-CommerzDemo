const  mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    title :{type:String,required:true}
},
    {timestamps:true,versionKey:false});
const AboutModel=mongoose.model('abouts',DataSchema);
module.exports=AboutModel;
