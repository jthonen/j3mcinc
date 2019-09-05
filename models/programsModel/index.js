const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Programs = new Schema({
    parentCategory: { type: String, required: false},
    parentSubcategory: { type: String, required: false},
    programName: { type: String, required: true },
    programEnrollees: { type: String, required: true },
    programDifficulty: { type: Number, required: true },
    programDescription: { type: String, required: true },
    programDisplayedTitle: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Programs", Programs);