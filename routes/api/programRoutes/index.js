const router = require("express").Router();
const controllers = require("../../../controllers");

router.route("/add-new-category")
    .post((req, res) => {
        controllers.programControllers.addNewCategory(req, res);
    });

router.route("/get-all-categories")
    .get((req, res) => {
        controllers.programControllers.getAllCategories(req, res);
    });

router.route("/add-new-subcategory")
    .post((req, res) => {
        controllers.programControllers.addNewSubcategory(req, res);
    });

router.route("/get-all-subcategories")
    .get((req, res) => {
        controllers.programControllers.getAllSubcategories(req, res);
    });

router.route("/add-new-program")
    .post((req, res) => {
        controllers.programControllers.addNewProgram(req, res);
    });

router.route("/get-all-programs")
    .get((req, res) => {
        controllers.programControllers.getAllPrograms(req, res);
    });

module.exports = router;