var express = require("express");
var router = express.Router();
var multer = require("multer");
var Compair = require("../models/compair");
var upload = multer({
  dest: "public/uploads/"
});

router.get("/", function(req, res) {
	Compair.find({}, function(err, compairs) {
		if (err) {
			console.log(err);
		} else {
			res.render("compairs/index", {compairs: compairs});
		}
	});
});

router.get("/new", function(req,res) {
	res.render("compairs/new");
});

router.post("/", upload.array("image", 2), function(req, res) {
	var compair = req.body.compair;
	console.log("USER");
	console.log(req.user);
	compair.author = req.user;
	compair.images = [
		{
			filename: req.files[0].filename,
			likes: {
				amount: 0
			}
		},
		{
			filename: req.files[1].filename,
			likes: {
				amount: 0
			}
		}
	];
	Compair.create(compair, function(err, compair) {
		if (err) {
			console.log(err);
		} else {
			console.log("Compair entry added");
			console.log(compair);
			res.redirect("/compairs");
		}
	});
});

router.get("/:id", function(req, res) {
	var id = req.params.id;
	Compair.findById(id, function(err, compair) {
		if (err) {
			console.log(err);
		} else {
			res.render("compairs/show", {compair: compair});
		}
	})
})

module.exports = router;