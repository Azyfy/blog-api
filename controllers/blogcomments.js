const Blogpost = require("../models/blogpost");
const Blogcomment = require("../models/blogcomment");

const { body, validationResult } = require("express-validator");

exports.get_comments = (req, res, next) => {
    Blogcomment.find().populate("blogpost")
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.create_comment = [

    body("blogpost").trim().escape(),
    body("user").trim().escape(),
    body("comment", "Comment cant be empty").trim().isLength({min: 1}).escape(),
    body("isadmin").isBoolean().escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if(req.body.user == "") {
            req.body.user = "Anonymous";
        }
        else if (req.body.user == "Admin") {
            if((req.body.isadmin == "false")) {
                req.body.user = "Fake Admin";
            }
        }
        

        const comment = new Blogcomment(
            {
                blogpost: req.body.blogpost,
                user: req.body.user,
                comment: req.body.comment,
            }
        );

        if(!errors.isEmpty()) {
            res.json(errors.array());
        }
        else {
            comment.save()
                .then(() => res.json('Comment posted'))
                .catch(err => res.status(400).json('Error: ' + err));
        }

    }
]

exports.delete_single_comment = (req, res, next) => {

    Blogcomment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}