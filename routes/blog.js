const express = require("express");
const router = express.Router();

const blogpostsController = require("../controllers/blogposts");

router.get("/", blogpostsController.get_posts);

router.get("/:id", blogpostsController.get_single_post);


module.exports = router;