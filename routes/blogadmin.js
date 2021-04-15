const express = require("express");
const router = express.Router();

const blogadminController = require("../controllers/blogadmin");
const blogpostsController = require("../controllers/blogposts");

router.get("/", (req, res, next) => {
    let obj = {
        name: "blogadmin",
        text: "some text of blogadmin"
    }
    res.json(obj);
});

//blogadmin
router.post("/login", blogadminController.login);

//blogpost
router.get("/posts", blogpostsController.get_posts);

router.post("/posts/new", blogpostsController.create_post);

router.get("/posts/:id", blogpostsController.get_single_post);

router.delete("/posts/:id", blogpostsController.delete_single_post);

module.exports = router;