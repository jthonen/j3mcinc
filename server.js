// Require express server
const express = require("express");

// Define app & port.
const app = express();
const PORT = process.env.PORT || 6030;

// Middleware & security
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan")('combined');
const bodyParser = require("body-parser");

// Require Mongoose & Admin Model
const mongoose = require( "mongoose");
const Admin = require("./models").Admin;

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/NCRCTennis_API");

// require Passport.js encryption & local login authentication dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo')(session);

// Require passport_secret
const passport_secret = require("./passport_secret.js");
// If passport_secret does not equal undefined --> use express session with the passport_secret or log failure & debugging help
if (passport_secret !== undefined) {
    app.use(session({
        secret: passport_secret,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: true,
        saveUninitialized: true
    }));
} else {
    const missingPassportSecretErrorMessage = "passport_secret has not been defined. Check .env file or dotenv configuration";
    console.error(missingPassportSecretErrorMessage);
};

// Define middleware here
app.use(helmet());
app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(cookieParser());

// Set up passport.js local strategy
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Initialize Passport & passport/express-session for App
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

// Add routes, both API and view
app.use(require("./routes"));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});