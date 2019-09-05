const db = require("../../models");

module.exports = {
    getAllAdmins: function(req, res)    {
        try {
            db.Admin.find()
                .then((results) =>  {
                    res.send(results);
                })
                .catch(err  =>  {
                    console.log(err);
                    process.exit(1);
                });
        }
        
        catch (error) {
            res.send({message: error});
        };
    },
    addNewAdmin: function(req, res) {  
        try {
            db.Admin.register(
                new db.Admin({
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    authorization: "Admin",
                    dateRegistered: new Date(Date.now())
                }),
                req.body.pw,
                function(err) {
                    if (err) {
                        console.log('Error registering user!', err);
                        return next(err);
                    }
                    console.log("Registered");
                });
        }
        
        catch (error) {
            res.send({message: error});
        };
    },
    deleteAdmin: function(req, res) {
        try {
            db.Admin.deleteOne({"_id": req.params._id})
                .then((data) => {
                    res.send({message: data});
                });
        }
        
        catch (error) {
            res.send({message: error});
        };
    },
    transferOwnership: function(req, res) {
        try {
            db.Admin.updateOne({"authorization": "Owner"}, {"authorization": "Admin"})
                .then((data1) => {
                    db.Admin.updateOne({"_id": req.params._id}, {"authorization": "Owner"})
                        .then((data2) => {
                            res.send({message: [data1, data2]});
                        });
                });  
        }
        
        catch (error) {
            res.send({message: error});
        };
    },
    resetPassword: function (req, res) {
        console.log(req.body);
        console.log(req.user);
    }
};