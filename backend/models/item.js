const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    label: String,
    parentId: Number,
    pos: Number,
});

module.exports = mongoose.model("Item", itemSchema);