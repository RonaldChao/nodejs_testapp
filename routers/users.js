const express = require('express');
const router = express.Router();

const User = require('../models/user')

// Register
router.post('/register', (req, res, next)=>{

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })

  User.addUser(newUser, (err, user)=>{
    if(err){
      res.json({success: false, msg:'Failed to register User'});
    }else{
      res.json({success: true, msg:'Register User'});
    }
  })
});

module.exports = router;
