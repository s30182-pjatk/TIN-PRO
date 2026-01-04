const Subscription = require("../database/models/Subscription");

const toggleSubscription = async (req, res) => {
    try {
        const subscriberId = req.userId;
        const publisherId = req.params.id;

        if (subscriberId === publisherId) {
            return res.status(400).json({ message: "Cannot subscribe to yourself" });
        }

        const existingSubscription = await Subscription.findOne({
            subscriber: subscriberId,
            publisher: publisherId
        });

        // UNSUBSCRIBE
        if (existingSubscription) {
            await Subscription.deleteOne({ _id: existingSubscription._id });
            return res.status(200).json({
                subscribed: false,
                message: "Unsubscribed"
            });
        }

        // ➕ SUBSCRIBE
        await Subscription.create({
            subscriber: subscriberId,
            publisher: publisherId
        });

        res.status(200).json({
            subscribed: true,
            message: "Subscribed"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Subscription error" });
    }
};

module.exports = toggleSubscription;
