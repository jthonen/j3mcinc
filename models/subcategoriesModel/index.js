const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategories = new Schema({
    parentCategory: { type: String, required: true},
    subcategoryName: { type: String, required: true},
    subcategoryDescription: { type: String, required: true },
    subcategoryDisplayedTitle: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subcategories", Subcategories);