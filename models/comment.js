var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	content: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	created_at: {
		type: String,
		default: Date.now();
	}
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;