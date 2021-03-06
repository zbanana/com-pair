var express 		= require("express"),
	methodOverride 	= require("method-override"),
	passport 		= require("passport"),
	LocalStrategy  	= require("passport-local"),
	mongoose	   	= require("mongoose"),
	expressSession  = require("express-session"),
	User 			= require("./models/user"),
	bodyParser 		= require("body-parser");
	app				= express();

// ROUTES
var compairRoutes = require("./routes/compairs"),
	commentRoutes = require("./routes/comments"),
	userRoutes	  = require("./routes/users");

// ***************
// INITIAL CONFIGS
// ***************
// Set template engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

// Set public directory for static files
app.use(express.static(__dirname + "/public"));
// Set method override to listen for _method string
app.use(methodOverride("_method"));

// CONNECT TO DB
mongoose.connect(process.env.DB || "mongodb://localhost/compair");

// ***************
// PASSPORT CONFIG
// ***************
app.use(expressSession({
	secret: "12345thisisatopsecretsecret54321",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass the user in every request
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
})	

// Set default url for the different route types
app.use("/compairs", compairRoutes);
app.use("/compairs/:id/comments", commentRoutes);
app.use("/", userRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Server listening on port " + port);
})
