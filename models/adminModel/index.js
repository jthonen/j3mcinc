const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Admin = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  authorization: { type: String, required: true },
  dateRegistered: { type: Date, default: Date.now }
});

Admin.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", Admin);