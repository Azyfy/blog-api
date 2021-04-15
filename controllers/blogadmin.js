const Blogadmin = require("../models/blogadmin");
const Blogpost = require("../models/blogpost");

const { body, validationResult } = require("express-validator");

exports.login = (req, res, next) => {
   res.json("Login")
}