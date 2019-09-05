const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const programRoutes = require("./programRoutes");

router.use("/admin", adminRoutes);

router.use("/programs", programRoutes);

module.exports = router;