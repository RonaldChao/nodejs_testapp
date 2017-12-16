const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  googleID:{
    type: String,
    required: true
  }
});

mongoose.model('users', UserSchema);

// // User schema
// const UserSchema = new Schema({
//   name:{
//     type: String
//   },
//   email:{
//     type:String,
//     required:true
//   },
//   username:{
//     type:String,
//     required:true
//   },
//   password:{
//     type:String,
//     required:true
//   }
// });
//
// const User = module.exports = mongoose.model('users', UserSchema);
//
// // Get user by id
// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }
//
// // Get user by username
// module.exports.getUserByUsername = function(username, callback){
//   const query = {username: username};
//   User.findOne(query, callback);
// }
//
// module.exports.addUser = function(newUser, callback){
//   newUser.save(callback);
// }
