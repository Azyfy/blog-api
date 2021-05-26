const express = require("express");
const router = express.Router();

const blogpostsController = require("../controllers/blogposts");
const blogcommentsController = require("../controllers/blogcomments");

router.get("/", blogpostsController.get_posts);

router.get("/comments", blogcommentsController.get_comments);

router.post("/comments", blogcommentsController.create_comment);

router.get("/:id", blogpostsController.get_single_post);


module.exports = router;