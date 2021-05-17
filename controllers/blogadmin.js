const Blogadmin = require("../models/blogadmin");
const Blogpost = require("../models/blogpost");

const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

exports.login = [
   body("user", "User cant be empty").trim().isLength({min: 1}).escape(),
   body("password", "Password cant be empty").trim().isLength({min: 1}).escape(),

   (req, res, next) => {

      const errors = validationResult(req);
      
      if(!errors.isEmpty()) {
         res.json(errors.array());
     }
     else {
      Blogadmin.findOne({ "username": req.body.user })
      .then(user => {
          //mock login
          if(req.body.password === "12345" && user!=null ) {
            res.json("Login")
          }
          else {
            res.json("Wrong password or user")
          }
      })
      .catch(err => res.status(400).json('Error: ' + err));

     }

   }
]