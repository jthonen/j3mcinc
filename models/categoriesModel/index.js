const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categories = new Schema({
    categoryName: { type: String, required: true},
    categorySeason: { type: String, required: true},
    categoryDescription: { type: String, required: true },
    categoryDisplayedTitle: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Categories", Categories);