const router = require("express").Router();
const controllers = require("../../../controllers");
const passport = require("passport");

router.route("/authenticate")
    .post(passport.authenticate('local', {successRedirect: '/admin/dashboard', failureRedirect: '/admin', failureFlash: true}));

router.route("/check-authenticated")
    .get((req, res) =>  {
        if (req.isAuthenticated()) {
            res.send({authenticated: req.isAuthenticated(), admin: req.user});
        } else {
            res.send({authenticated: req.isAuthenticated()});
        };
    });

router.route('/logout')
    .get((req, res) => {
        req.logout();
        res.send({loggedOut: true});
    });

router.route("/get-all")
    .get((req, res) =>  {
        controllers.adminControllers.getAllAdmins(req, res);
    });

router.route("/add-new")
    .post((req, res) => {
        controllers.adminControllers.addNewAdmin(req, res);
    });

router.route("/delete/_id/:_id")
    .delete((req, res) => {
        controllers.adminControllers.deleteAdmin(req, res);
    });

router.route("/transfer-ownership/_id/:_id")
    .put((req, res) => {
        controllers.adminControllers.transferOwnership(req, res);
    });

router.route("/reset-password")
    .post((req, res) => {
        controllers.adminControllers.resetPassword(req, res);
    });
    
module.exports = router;