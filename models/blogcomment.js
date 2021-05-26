const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        blogpost: { type: Schema.Types.ObjectId, ref:"Blogpost", requred: true },
        user: { type: String, required: true },
        comment: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);