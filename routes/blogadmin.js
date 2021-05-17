const express = require("express");
const router = express.Router();

const blogadminController = require("../controllers/blogadmin");
const blogpostsController = require("../controllers/blogposts");

const jwt = require("jsonwebtoken");

const passport = require("passport");
const jwtStrategry  = require("../jwt")
passport.use(jwtStrategry);

//blogadmin
router.post("/login", blogadminController.login);

//blogpost
router.get("/posts", passport.authenticate('jwt', { session: false }), blogpostsController.get_posts);

router.post("/posts/new", passport.authenticate('jwt', { session: false }), blogpostsController.create_post);

router.get("/posts/:id", passport.authenticate('jwt', { session: false }), blogpostsController.get_single_post);

router.delete("/posts/:id", passport.authenticate('jwt', { session: false }), blogpostsController.delete_single_post);

module.exports = router;