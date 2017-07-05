var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req, res) {
	var newUser = new User(req.body.user);
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/compairs");
		});
	});
});


router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/compairs",
		failureRedirect: "/compairs"
	}
));

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/compairs");
});

module.exports = router;