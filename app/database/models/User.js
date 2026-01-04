const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        registrationDate: {
            type: Date,
            default: Date.now(),
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
    }
);
const user = mongoose.model("User", userSchema);
module.exports = user;