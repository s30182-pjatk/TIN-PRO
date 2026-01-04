const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const roleSchema = new Schema(
    {
        name: String,
        description: String
    }
);
const role = mongoose.model("Role", roleSchema);
module.exports = role;