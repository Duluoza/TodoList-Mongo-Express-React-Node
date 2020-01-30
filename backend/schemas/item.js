const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    label: String,
    parentId: Schema.Types.ObjectID,
    pos: Number,
    ancestors: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model("Item", itemSchema);