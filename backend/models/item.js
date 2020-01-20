const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    label: String,
    id: Number,
    // pos: {
    //     type: Number,
    //     default: 1
    // },
    // parentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'List'
    // },
});

module.exports = mongoose.model("Item", itemSchema);