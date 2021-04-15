const Blogadmin = require("../models/blogadmin");
const Blogpost = require("../models/blogpost");

const { body, validationResult } = require("express-validator");


exports.get_posts = (req, res, next) => {
    Blogpost.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.create_post = [

    body("title", "Title cant be empty").trim().isLength({min: 1}).escape(),
    body("text", "Text area cant be empty").trim().isLength({min: 1}).escape(),


    (req, res, next) => {

        const errors = validationResult(req);

        const post = new Blogpost(
            {
                title: req.body.title,
                text: req.body.text,
            }
        );

        if(!errors.isEmpty()) {
            res.json(errors.array());
        }
        else {
            post.save()
                .then(() => res.json('Post submitted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }

    }
]

exports.get_single_post = (req, res, next) => {

    Blogpost.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));

}

exports.delete_single_post = (req, res, next) => {

    Blogpost.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}