var mongoose = require("mongoose");

var compairSchema = new mongoose.Schema({
	title: String,
	description: String,
	images: [
		{
			filename: String,
			likes: {
				amount: Number,
				users: [
					{
						type: Mongoose.Schema.Types.ObjectId,
						ref: "User"
					}
				]
			}
		}
	],
	comments: [
		{
			type: Mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	author: {
		type: Mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	created_at: {
		type: String,
		default: Date.now()
	}
});

var Compair = mongoose.model("Compair", compairSchema);

module.exports = Compair;