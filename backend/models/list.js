const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
    },
    id: Number
});

module.exports = mongoose.model("List", listSchema);