const mongoose = require('mongoose');

const TalentSchema = mongoose.Schema({
  name:{type:String,required:true},
  year:{type:String,required:true},
  department:{type:String},
  skill:{type:String,required:true},
  imagePath:{type:String},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",}
})

module.exports = mongoose.model('Talent',TalentSchema);
