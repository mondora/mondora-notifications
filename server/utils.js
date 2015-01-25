Utils = {
    ensure: function (condition, reason) {
        if (!condition) {
            throw new Meteor.Error(
                "incorrect-request",
                reason
            );
        }
    },
    ensureBasics: function (user, notification) {
        Utils.ensure(user, "Login required");
        Utils.ensure(notification, "Notification doesn't exist");
        Utils.ensure(notification.userId === user._id, "Notification doesn't belong to user");
    }
};
