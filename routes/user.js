const express = require('express')

const router = express.Router();

const bcrypt = require('bcrypt');

const User = require("../models/user");

const jwt = require("jsonwebtoken");
// const { RadioControlValueAccessor } = require('@angular/forms');

router.post("/signup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created !',
            result: result
          })
        })
        .catch(err => {
          res.status(400).json({ message: "Invalid authentication credentials !" }
          )
        })
    })
})

router.post("/login",(req,res,next)=>{

  let fetchedUser;
  // console.log(req.body.mail);
  User.findOne({email:req.body.email})
  .then(user=>{
    if(!user)
    {
      res.status(401).json({
        message:'Invalid Authentication Credentials !!!'
      });
      return;
    }
    fetchedUser=user;
    // console.log(bcrypt.compare(req.body.password,user.password));

    bcrypt.compare(req.body.password,user.password).then(result=>{
      if(!result)
      {
        // console.log("authentication failed .");
        res.status(401).json({
          message:"Authentication has been failed"
        });
        return;
      }
      if(result)
      {
        const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
          'GANESH_RAVINDRA_VERNEKAR',{expiresIn:"1h"});

          res.status(200).json({
            token:token,
            expiresIn:3600,
            userId:fetchedUser._id
          })
      }})
      .catch(err=>{
        return res.status(401).json({
          message:"Authentication failed"
        })
      })

      })
    })

module.exports = router
