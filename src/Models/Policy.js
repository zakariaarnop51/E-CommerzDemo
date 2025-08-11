const  mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
        title :{type:String,required:true}
    },
    {timestamps:true,versionKey:false});
const PolicyModel=mongoose.model('Policy',DataSchema);
module.exports=PolicyModel;

