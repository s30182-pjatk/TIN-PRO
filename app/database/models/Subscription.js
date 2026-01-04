const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        publisher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subscriptionDate: {
            type: Date,
            default: Date.now
        }
    }
);

subscriptionSchema.index(
    { subscriber: 1, publisher: 1},
    {unique: true}
)

const subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = subscription;