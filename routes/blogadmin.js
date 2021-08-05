const express = require("express");
const router = express.Router();

const blogadminController = require("../controllers/blogadmin");
const blogpostsController = require("../controllers/blogposts");
const blogcommentsController = require("../controllers/blogcomments");

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

router.get("/comments", passport.authenticate('jwt', { session: false }), blogcommentsController.get_comments);

router.post("/comments", passport.authenticate('jwt', { session: false }), blogcommentsController.create_comment);

router.delete("/comments/:id", passport.authenticate('jwt', { session: false }), blogcommentsController.delete_single_comment);

module.exports = router;