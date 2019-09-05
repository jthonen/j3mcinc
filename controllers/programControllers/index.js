const db = require("../../models");

module.exports = {
    addNewCategory: function(req, res) {
        try {
             db.Categories.create(req.body).then((data) => {
                 res.send(data);
             });
        }
        catch (error) {
            res.send({message: error});
        };
    },
    getAllCategories: function(req, res) {
        try {
            db.Categories.find()
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
    addNewSubcategory: function(req, res) {
        try {
            db.Subcategories.create(req.body).then((data) => {
                res.send(data);
            });
        }
        catch (error) {
            res.send({message: error});
        }
    },
    getAllSubcategories: function(req, res) {
        try {
            db.Subcategories.find()
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
    addNewProgram: function(req, res) {
        try {
            db.Programs.create(req.body).then((data) => {
                res.send(data);
            });
        }
        catch (error) {
            res.send({message: error});
        }
    },
    getAllPrograms: function(req, res) {
        try {
            db.Programs.find()
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
};