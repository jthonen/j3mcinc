const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/j3mcinc_db");

const AdminSeed = {
    username: "joe.elmished@gmail.com",
    firstName: "Joe",
    lastName: "Elmished",
    authorization: "Owner",
    dateRegistered: new Date(Date.now())
};

function placeInitialAdminSeed()    {
    // delete Admins in MongoDB
    db.Admin.deleteMany({}).then(res => console.log(res));
    // Registering Admin seed in MongoDB (Seed password is encrypted with Passport.js salt and hash)
    setTimeout(function()   {
        db.Admin.register(new db.Admin(AdminSeed), "chang3AfterDeployment!", function(err) {
            if (err) {
                console.log('Error registering user!', err);
                return next(err);
            }
            console.log("Registered");
            return process.exit(0);
        });
    }, 7500);
};


// Add inquirer CLI to guide seeds on production deployment (in case re-deploying down the road);
placeInitialAdminSeed();