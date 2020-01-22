const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    parentId: Schema.Types.ObjectID,
});

module.exports = mongoose.model("List", listSchema);